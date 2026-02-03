using System.Text.Json.Serialization;

namespace EasyTripPlanner.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int DurationDays { get; set; }

        public int DestinationId { get; set; }
        public Destination Destination { get; set; }
        public string? Description { get; set; }
        [JsonIgnore]
        public ICollection<Booking> Bookings { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Itinerary { get; set; }

    }


}
