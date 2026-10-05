namespace GoTravel.API.Entities
{
    public class Tour
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        
        public int DurationDays { get; set; }
        public int DurationNights { get; set; }
        public string DepartureCity { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public string Transport { get; set; } = string.Empty;
        
        public decimal AdultPrice { get; set; }
        public decimal ChildPrice { get; set; }
        public decimal InfantPrice { get; set; }
        
        public double Rating { get; set; }
        public int ReviewCount { get; set; }
        
        public string Status { get; set; } = "Active";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<TourDeparture> Departures { get; set; } = new List<TourDeparture>();
    }

    public class TourDeparture
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        
        public decimal AdultPrice { get; set; }
        public decimal ChildPrice { get; set; }
        public decimal InfantPrice { get; set; }
        
        public int TotalSeats { get; set; }
        public int AvailableSeats { get; set; }
        
        public string Status { get; set; } = "Active";
    }
}
