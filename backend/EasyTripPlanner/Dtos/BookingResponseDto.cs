namespace EasyTripPlanner.Dtos
{
    public class BookingResponseDto
    {
        public int BookingId { get; set; }
        public string BookingStatus { get; set; }
        public DateTime BookingDate { get; set; }
        public int TripId { get; set; }
    }
}
