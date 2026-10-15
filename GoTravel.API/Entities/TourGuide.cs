namespace GoTravel.API.Entities
{
    public class TourGuide
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public ICollection<TourGuideAssignment> Assignments { get; set; } = new List<TourGuideAssignment>();
    }
}
