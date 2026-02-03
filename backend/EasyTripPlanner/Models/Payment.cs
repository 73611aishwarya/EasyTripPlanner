namespace EasyTripPlanner.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
        public string OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentStatus { get; set; } // Success / Failed
        public string? TransactionId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Currency { get; set; } = "INR";
        public required string CustomerEmail { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }

}
