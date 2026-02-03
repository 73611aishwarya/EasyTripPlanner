namespace EasyTripPlanner.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int TripId { get; set; }   // FK
        public Trip Trip { get; set; }    // Navigation

        public int UserId { get; set; }

     

        public int Days { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }

        public string TravelMode { get; set; }
        public string HotelCategory { get; set; }

        public decimal TotalAmount { get; set; }

        public string BookingStatus { get; set; }
        public string PaymentStatus { get; set; }

        public DateTime BookingDate { get; set; }

        public int? PaymentId { get; set; }
        public Payment Payment { get; set; }

        public DateTime? ConfirmedAt { get; set; }
    }

}
