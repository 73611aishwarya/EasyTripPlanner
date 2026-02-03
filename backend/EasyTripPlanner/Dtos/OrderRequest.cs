namespace EasyTripPlanner.Dtos
{
   

    public class OrderRequest
    {
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
    }


}
