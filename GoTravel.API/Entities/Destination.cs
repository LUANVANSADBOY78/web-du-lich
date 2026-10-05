namespace GoTravel.API.Entities
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string GooglePlaceId { get; set; } = string.Empty;
        public int MapZoom { get; set; } = 12;
        
        public string MainImage { get; set; } = string.Empty;
        public double Rating { get; set; }
        public bool Featured { get; set; }
        public string Status { get; set; } = "Active";
    }
}
