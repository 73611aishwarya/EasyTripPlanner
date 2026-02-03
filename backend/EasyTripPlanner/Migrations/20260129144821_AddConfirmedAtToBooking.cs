using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyTripPlanner.Migrations
{
    /// <inheritdoc />
    public partial class AddConfirmedAtToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ConfirmedAt",
                table: "Bookings",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmedAt",
                table: "Bookings");
        }
    }
}
