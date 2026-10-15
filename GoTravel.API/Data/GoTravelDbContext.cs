using GoTravel.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace GoTravel.API.Data
{
    public class GoTravelDbContext : DbContext
    {
        public GoTravelDbContext(DbContextOptions<GoTravelDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<TourDeparture> TourDepartures { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        
        // AI Chatbot
        public DbSet<ChatConversation> ChatConversations { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Tour - TourDeparture one-to-many relationship
            modelBuilder.Entity<Tour>()
                .HasMany(t => t.Departures)
                .WithOne(d => d.Tour)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tour>().HasIndex(t => t.Slug).IsUnique();
            modelBuilder.Entity<Tour>().HasIndex(t => t.Code).IsUnique();

            modelBuilder.Entity<TourDestination>()
                .HasKey(td => new { td.TourId, td.DestinationId });
        }
    }
}
