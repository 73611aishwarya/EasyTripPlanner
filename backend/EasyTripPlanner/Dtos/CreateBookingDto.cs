namespace EasyTripPlanner.Dtos
{
    public class CreateBookingDto
    {
        public string Destination { get; set; }
        public int Days { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public string TravelMode { get; set; }
        public string HotelCategory { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
