namespace GoTravel.API.Entities
{
    public class TourHighlight
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
