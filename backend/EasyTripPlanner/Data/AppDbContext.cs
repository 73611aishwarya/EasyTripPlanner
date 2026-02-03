using EasyTripPlanner.Models;
using Microsoft.EntityFrameworkCore;


namespace EasyTripPlanner.Data   // Match this with your project namespace and folder structure
{
    public class AppDbContext : DbContext
    {
        // Constructor that takes options and passes to base DbContext
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSet representing Users table in your DB
        public DbSet<User> Users { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Trip> Trips { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Payment)
                .WithOne(p => p.Booking)
                  .HasForeignKey<Payment>(p => p.BookingId)
                  .IsRequired(false);
            base.OnModelCreating(modelBuilder);
        }

    }
}
