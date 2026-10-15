namespace GoTravel.API.Entities
{
    public class TourHomeSection
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int Order { get; set; }
        public ICollection<TourHomeSectionItem> Items { get; set; } = new List<TourHomeSectionItem>();
    }
}
