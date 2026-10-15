namespace GoTravel.API.Entities
{
    public class TourPartner
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public ICollection<Tour> Tours { get; set; } = new List<Tour>();
    }
}
