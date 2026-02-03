namespace EasyTripPlanner.Dtos
{
    public class MyTripDto
    {
        public int BookingId { get; set; }
        public string Destination { get; set; } = "";
        public string BookingStatus { get; set; } = "";
        public string PaymentStatus { get; set; } = "";
    }
}
