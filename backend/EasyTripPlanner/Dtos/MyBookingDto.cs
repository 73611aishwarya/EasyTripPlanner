namespace EasyTripPlanner.Dtos
{
    public class MyBookingDto
    {
        public int BookingId { get; set; }
        public string BookingStatus { get; set; }
        public DateTime BookingDate { get; set; }

        public int TripId { get; set; }
        public string TripName { get; set; }

        public string DestinationName { get; set; }
    }
}
