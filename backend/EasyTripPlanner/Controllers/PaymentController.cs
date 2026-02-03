using EasyTripPlanner.Data;
using EasyTripPlanner.Dtos;
using EasyTripPlanner.Models;
using EasyTripPlanner.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace EasyTripPlanner.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly CashfreeSettings _cashfree;
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;

        public PaymentController(
            IOptions<CashfreeSettings> cashfree,
            IHttpClientFactory httpClientFactory,
            AppDbContext context)
        {
            _cashfree = cashfree.Value;
            _httpClient = httpClientFactory.CreateClient();
            _context = context;
        }

        // ==================================
        // STEP 1: CREATE CASHFREE ORDER
        // ==================================
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("Invalid or expired token");

            int userId = int.Parse(userIdClaim.Value);



            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("User email not found in token");
            }


            // ================================
            // Validate booking
            // ================================
            var booking = _context.Bookings
                .FirstOrDefault(b => b.Id == request.BookingId && b.UserId == userId);

            if (booking == null)
                return BadRequest("Invalid booking");

            if (booking.BookingStatus == "Confirmed")
                return BadRequest("Booking already confirmed");

            //  PREVENT DUPLICATE PAYMENT CREATION
            if (booking.PaymentId != null)
                return BadRequest("Payment already initiated for this booking");

            // ================================
            // Cashfree order payload
            // ================================
            var payload = new
            {
                order_id = "ORDER_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
                order_amount = request.Amount,
                order_currency = "INR",
                customer_details = new
                {
                    customer_id = "cust_" + Guid.NewGuid(),
                    customer_name = request.CustomerName,
                    customer_email = request.CustomerEmail,
                    customer_phone = request.CustomerPhone
                },
                order_meta = new
                {
                    return_url = "http://localhost:5173/payment-success?order_id={order_id}"
                }
            };

            var json = JsonSerializer.Serialize(payload);

            var httpRequest = new HttpRequestMessage(
                HttpMethod.Post,
                $"{_cashfree.BaseUrl}/orders");

            httpRequest.Headers.Add("x-client-id", _cashfree.AppId);
            httpRequest.Headers.Add("x-client-secret", _cashfree.SecretKey);
            httpRequest.Headers.Add("x-api-version", "2023-08-01");
            httpRequest.Content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(httpRequest);
            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return BadRequest("Failed to create order with payment gateway");

            // ================================
            // Parse Cashfree response
            // ================================
            var cashfreeResponse = JsonDocument.Parse(result);
            var root = cashfreeResponse.RootElement;

            string? orderId = null;
            string? paymentSessionId = null;

            if (!root.TryGetProperty("order_id", out var orderIdProp) ||
                !root.TryGetProperty("payment_session_id", out var sessionIdProp))
            {
                return BadRequest("Invalid response from payment gateway");
            }

            orderId = orderIdProp.GetString();
            paymentSessionId = sessionIdProp.GetString();

            // ================================
            // Save payment (PENDING)
            // ================================
            var payment = new Payment
            {
                BookingId = booking.Id,
                UserId = userId,
                OrderId = orderId,
                Amount = booking.TotalAmount,
                CustomerEmail = userEmail,
                PaymentStatus = "Pending",
                CreatedAt = DateTime.UtcNow
            };

            _context.Payments.Add(payment);

            booking.PaymentStatus = "Pending";
            booking.PaymentId = payment.Id;

            await _context.SaveChangesAsync();


            // ================================
            // Send response to frontend
            // ================================
            return Ok(new
            {
                orderId,
                paymentSessionId
            });
        }

        // ==================================
        // STEP 2: PAYMENT SUCCESS (FRONTEND CONFIRMATION)
        // ==================================
        [Authorize]
        [HttpPost("payment-success")]
        public async Task<IActionResult> PaymentSuccess(PaymentSuccessDto dto)
        {
            var payment = await _context.Payments
                .Include(p => p.Booking)
                .FirstOrDefaultAsync(p => p.OrderId == dto.OrderId);

            if (payment == null)
                return BadRequest("Invalid order");

            //  Update payment
            payment.TransactionId = dto.TransactionId;
            payment.PaymentStatus = "Paid";

            // Update booking
            payment.Booking.BookingStatus = "Confirmed";

            await _context.SaveChangesAsync();

            return Ok();
        }



        // ==================================
        // STEP 3: CHECK PAYMENT STATUS
        // ==================================
        [HttpGet("status/{bookingId}")]
        [Authorize]
        public IActionResult GetPaymentStatus(int bookingId)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var booking = _context.Bookings
                .Where(b => b.Id == bookingId && b.UserId == userId)
                .Select(b => new
                {
                    b.BookingStatus,
                    PaymentStatus = b.Payment != null
                        ? b.Payment.PaymentStatus
                        : "Pending"
                })
                .FirstOrDefault();

            if (booking == null)
                return NotFound();

            return Ok(booking);
        }

    }
}