namespace GoTravel.API.Entities
{
    public class TourHomeSectionItem
    {
        public int Id { get; set; }
        public int TourHomeSectionId { get; set; }
        public TourHomeSection? TourHomeSection { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        public int Order { get; set; }
    }
}
