namespace GoTravel.API.Entities
{
    public class TourCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public TourCategory? Parent { get; set; }
        public ICollection<TourCategory> Children { get; set; } = new List<TourCategory>();
        public ICollection<Tour> Tours { get; set; } = new List<Tour>();
    }
}
