namespace GoTravel.API.Entities
{
    public class TourImage
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsMain { get; set; }
    }
}
