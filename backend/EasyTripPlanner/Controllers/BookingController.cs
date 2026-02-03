using EasyTripPlanner.Data;

using EasyTripPlanner.Dtos;
using EasyTripPlanner.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EasyTripPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] 
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        // ================================
        // CREATE BOOKING (PENDING)
        // ================================
        // POST: api/booking/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            if (dto.Days <= 0 || dto.Adults <= 0)
                return BadRequest("Invalid booking details");

            // Create Destination
            //  Get or create destination
            var destination = await _context.Destinations
                .FirstOrDefaultAsync(d => d.Name == dto.Destination);

            if (destination == null)
            {
                destination = new Destination
                {
                    Name = dto.Destination,
                    Country = "India"
                };
                _context.Destinations.Add(destination);
                await _context.SaveChangesAsync();
            }

            //  Create Trip
            var trip = new Trip
            {
                Name = $"{dto.Destination} Trip",
                Price = dto.TotalAmount,
                DurationDays = dto.Days,
                DestinationId = destination.Id,
                Description = $"Trip to {dto.Destination}",
                Itinerary = "To be planned",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(dto.Days)
            };

            _context.Trips.Add(trip);
            await _context.SaveChangesAsync();

            // Create Booking
            var booking = new Booking
            {
                UserId = userId,
                TripId = trip.Id,
                Days = dto.Days,
                Adults = dto.Adults,
                Children = dto.Children,
                TravelMode = dto.TravelMode,
                HotelCategory = dto.HotelCategory,
                TotalAmount = dto.TotalAmount,
                BookingStatus = "Pending",
                PaymentStatus = "Pending",
                BookingDate = DateTime.UtcNow
            };


            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                bookingId = booking.Id,
                tripId = trip.Id
            });
        }





        // ======================================
        // GET RAW BOOKINGS (ENTITY BASED)
        // ======================================
        // GET: api/booking/my-bookings
        [HttpGet("my-bookings")]
        public IActionResult MyBookings()
        {
            int userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var bookings = _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Trip)
                    .ThenInclude(t => t.Destination)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new MyBookingDto
                {
                    BookingId = b.Id,
                    BookingStatus = b.BookingStatus,
                    BookingDate = b.BookingDate,

                    TripId = b.Trip.Id,
                    TripName = b.Trip.Name,

                    DestinationName = b.Trip.Destination.Name
                })
                .ToList();

            return Ok(bookings);
        }












        // ======================================
        // GET MY TRIPS (UI READY RESPONSE)
        // ======================================
        // GET: api/booking/my-trips
        [HttpGet("my-trips")]
        public IActionResult GetMyTrips()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var trips = _context.Bookings
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new MyTripDto
                {
                    BookingId = b.Id,
                    Destination = b.Trip.Destination.Name,
                    BookingStatus = b.BookingStatus,
                    PaymentStatus = b.PaymentStatus
                })
                .ToList();

            return Ok(trips);
        }



    }
}

