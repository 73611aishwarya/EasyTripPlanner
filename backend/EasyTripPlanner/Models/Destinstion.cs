using System.Text.Json.Serialization;

namespace EasyTripPlanner.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }

        [JsonIgnore]
        public ICollection<Trip> Trips { get; set; }
    }

}
