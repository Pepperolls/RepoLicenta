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
        public DbSet<UserModel> Users { get; set; }
        public DbSet<CarModel> Cars { get; set; }
        public DbSet<PartModel> Parts { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<OrderItemModel> OrderItems { get; set; }

        public AutoPartsContext(DbContextOptions<AutoPartsContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().HasKey(u => u.UserId);
            modelBuilder.Entity<UserModel>().Property(u => u.Username).IsRequired().HasMaxLength(20);
            modelBuilder.Entity<UserModel>().Property(u => u.Email).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.Password).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.FirstName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<UserModel>().Property(u => u.LastName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<UserModel>().Property(u => u.Country).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.City).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.ZipCode).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.Address).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.PhoneNumber).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.IsTwoFactorAuthenticationEnabled).IsRequired();
            modelBuilder.Entity<UserModel>().Property(u => u.IsAdmin).IsRequired();

            modelBuilder.Entity<CarModel>().HasKey(c => c.CarGuid);
            modelBuilder.Entity<CarModel>().Property(c => c.Make).IsRequired();
            modelBuilder.Entity<CarModel>().Property(c => c.Model).IsRequired();
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
            modelBuilder.Entity<PartModel>().Property(p => p.Name).IsRequired();
            modelBuilder.Entity<PartModel>().Property(p => p.Price).IsRequired().HasColumnType("decimal(18,2)");
            modelBuilder.Entity<PartModel>().Property(p => p.Category);
            modelBuilder.Entity<PartModel>().Property(p => p.Description);
            modelBuilder.Entity<PartModel>().Property(p => p.ImgUrl);

            modelBuilder.Entity<OrderModel>().HasKey(o => o.OrderGuid);
            modelBuilder.Entity<OrderModel>().Property(o => o.TotalPrice).IsRequired().HasColumnType("decimal(18,2)");

            modelBuilder.Entity<OrderItemModel>().HasKey(i => i.OrderItemGuid);
            modelBuilder.Entity<OrderItemModel>()
                .HasOne<OrderModel>()
                .WithMany()
                .HasForeignKey(i => i.FK_OrderGuid)
                .HasPrincipalKey(o => o.OrderGuid)
                .HasConstraintName("FK_OrderItemModel_OrderModel_OrderGuid");
        }
    }
}
