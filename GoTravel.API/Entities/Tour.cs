using System;
using System.Collections.Generic;

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
        public string Transport { get; set; } = string.Empty;
        
        public decimal AdultPrice { get; set; }
        public decimal ChildPrice { get; set; }
        public decimal InfantPrice { get; set; }
        
        public double Rating { get; set; }
        public int ReviewCount { get; set; }
        
        public string Status { get; set; } = "Active";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int? TourCategoryId { get; set; }
        public TourCategory? TourCategory { get; set; }

        public int? TourPartnerId { get; set; }
        public TourPartner? TourPartner { get; set; }

        public ICollection<TourDeparture> Departures { get; set; } = new List<TourDeparture>();
        public ICollection<TourDestination> TourDestinations { get; set; } = new List<TourDestination>();
        public ICollection<TourImage> Images { get; set; } = new List<TourImage>();
        public ICollection<TourHighlight> Highlights { get; set; } = new List<TourHighlight>();
        public ICollection<TourItinerary> Itineraries { get; set; } = new List<TourItinerary>();
        public ICollection<TourPrice> Prices { get; set; } = new List<TourPrice>();
        public ICollection<TourHomeSectionItem> HomeSectionItems { get; set; } = new List<TourHomeSectionItem>();
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

        public TourInventory? Inventory { get; set; }
        public ICollection<TourGuideAssignment> GuideAssignments { get; set; } = new List<TourGuideAssignment>();
    }
}
