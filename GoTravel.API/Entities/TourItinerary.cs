namespace GoTravel.API.Entities
{
    public class TourItinerary
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        public int DayNumber { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Accommodation { get; set; } = string.Empty;
        public string Meals { get; set; } = string.Empty;
    }
}
