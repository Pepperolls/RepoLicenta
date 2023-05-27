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

            modelBuilder.Entity<UserModel>().HasKey(u => u.UserId);
            modelBuilder.Entity<UserModel>().Property(u => u.Username).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<UserModel>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.Password).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.FirstName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<UserModel>().Property(u => u.LastName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<UserModel>().Property(u => u.IsAdmin).IsRequired();

            modelBuilder.Entity<CarModel>().HasKey(c => c.CarGuid);
            modelBuilder.Entity<CarModel>().Property(c => c.Make).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<CarModel>().Property(c => c.Model).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<CarModel>().Property(c => c.FabricationYear).IsRequired();
            modelBuilder.Entity<CarModel>().Property(c => c.CubicCapacity).IsRequired();
            modelBuilder.Entity<CarModel>().Property(c => c.FuelType).IsRequired();

            modelBuilder.Entity<PartModel>().HasKey(p => p.PartGuid);
            modelBuilder.Entity<PartModel>()
            .HasOne<CarModel>()
            .WithMany()
            .HasForeignKey(p => p.FK_CarGuid)
            .HasPrincipalKey(c => c.CarGuid)
            .HasConstraintName("FK_PartModel_CarModel_CarGuid");
            modelBuilder.Entity<PartModel>().Property(p => p.Name).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<PartModel>().Property(p => p.Price).IsRequired().HasColumnType("decimal(18,2)");
            modelBuilder.Entity<PartModel>().Property(p => p.Category).IsRequired().HasMaxLength(20);
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<CarModel> Cars { get; set; }
        public DbSet<PartModel> Parts { get; set; }
    }
}
