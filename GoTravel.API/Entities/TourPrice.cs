namespace GoTravel.API.Entities
{
    public class TourPrice
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        public int? TourDepartureId { get; set; }
        public TourDeparture? TourDeparture { get; set; }
        public string PriceType { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
