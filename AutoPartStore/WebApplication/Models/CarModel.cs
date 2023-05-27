using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class CarModel
    {
        public Guid CarGuid { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int FabricationYear { get; set; }
        public int CubicCapacity { get; set; }
        public string FuelType { get; set; }

        public CarModel()
        {
            CarGuid = Guid.NewGuid();
        }

        public CarModel(string make, string model, int fabricationYear, int cubicCapacity, string fuelType)
        {
            CarGuid = Guid.NewGuid();
            Make = make;
            Model = model;
            FabricationYear = fabricationYear;
            CubicCapacity = cubicCapacity;
            FuelType = fuelType;
        }
    }
}
