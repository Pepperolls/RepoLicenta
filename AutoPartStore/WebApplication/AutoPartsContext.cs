using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication
{
    public class AutoPartsContext : DbContext
    {
        public AutoPartsContext(DbContextOptions<AutoPartsContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*modelBuilder.Entity<CarModel>()
                .HasMany(p => p.Parts)
                .WithOne(c => c.Car)
                .HasForeignKey(k => k.CarModelId)
                .OnDelete(DeleteBehavior.Cascade);*/

            modelBuilder.Entity<UserModel>().HasKey(p => p.UserId);
            modelBuilder.Entity<UserModel>().Property(p => p.Username).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<UserModel>().Property(p => p.Email).IsRequired();
            modelBuilder.Entity<UserModel>().Property(p => p.Password).IsRequired();
            modelBuilder.Entity<UserModel>().Property(p => p.FirstName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<UserModel>().Property(p => p.LastName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<UserModel>().Property(p => p.IsAdmin).IsRequired();

            modelBuilder.Entity<CarModel>().Property(p => p.Make).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<CarModel>().Property(p => p.Model).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<CarModel>().Property(p => p.FabricationYear).IsRequired();
            modelBuilder.Entity<CarModel>().Property(p => p.CubicCapacity).IsRequired();
            modelBuilder.Entity<CarModel>().Property(p => p.FuelType).IsRequired();

            modelBuilder.Entity<PartModel>().Property(p => p.Name).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<PartModel>().Property(p => p.Price).IsRequired().HasColumnType("decimal(18,2)");
            modelBuilder.Entity<PartModel>().Property(p => p.Category).IsRequired().HasMaxLength(20);
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<CarModel> Cars { get; set; }
        public DbSet<PartModel> Parts { get; set; }
    }
}
