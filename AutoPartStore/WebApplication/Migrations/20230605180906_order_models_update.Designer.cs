﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication;

namespace WebApplication.Migrations
{
    [DbContext(typeof(AutoPartsContext))]
    [Migration("20230605180906_order_models_update")]
    partial class order_models_update
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication.Models.CarModel", b =>
                {
                    b.Property<Guid>("CarGuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("CubicCapacity")
                        .HasColumnType("int");

                    b.Property<int>("FabricationYear")
                        .HasColumnType("int");

                    b.Property<string>("FuelType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Make")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("CarGuid");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("WebApplication.Models.OrderItemModel", b =>
                {
                    b.Property<Guid>("OrderItemGuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("FK_OrderModelGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("OrderModelOrderGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PartModelGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("OrderItemGuid");

                    b.HasIndex("FK_OrderModelGuid");

                    b.HasIndex("OrderModelOrderGuid");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("WebApplication.Models.OrderModel", b =>
                {
                    b.Property<Guid>("OrderGuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("TotalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("OrderGuid");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("WebApplication.Models.PartModel", b =>
                {
                    b.Property<Guid>("PartGuid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FK_CarGuid")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImgUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("PartGuid");

                    b.HasIndex("FK_CarGuid");

                    b.ToTable("Parts");
                });

            modelBuilder.Entity("WebApplication.Models.UserModel", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApplication.Models.OrderItemModel", b =>
                {
                    b.HasOne("WebApplication.Models.OrderModel", null)
                        .WithMany()
                        .HasForeignKey("FK_OrderModelGuid")
                        .HasConstraintName("FK_OrderItemModel_OrderModel_OrderGuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApplication.Models.OrderModel", null)
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderModelOrderGuid");
                });

            modelBuilder.Entity("WebApplication.Models.PartModel", b =>
                {
                    b.HasOne("WebApplication.Models.CarModel", null)
                        .WithMany()
                        .HasForeignKey("FK_CarGuid")
                        .HasConstraintName("FK_PartModel_CarModel_CarGuid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApplication.Models.OrderModel", b =>
                {
                    b.Navigation("OrderItems");
                });
#pragma warning restore 612, 618
        }
    }
}