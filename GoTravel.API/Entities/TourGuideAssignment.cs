namespace GoTravel.API.Entities
{
    public class TourGuideAssignment
    {
        public int Id { get; set; }
        public int TourDepartureId { get; set; }
        public TourDeparture? TourDeparture { get; set; }
        public int TourGuideId { get; set; }
        public TourGuide? TourGuide { get; set; }
    }
}
