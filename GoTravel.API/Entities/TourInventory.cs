namespace GoTravel.API.Entities
{
    public class TourInventory
    {
        public int Id { get; set; }
        public int TourDepartureId { get; set; }
        public TourDeparture? TourDeparture { get; set; }
        public int TotalAllocated { get; set; }
        public int Sold { get; set; }
        public int Available { get; set; }
    }
}
