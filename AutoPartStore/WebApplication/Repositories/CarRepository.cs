using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly AutoPartsContext _dbContext;

        public CarRepository(AutoPartsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateCar(CarModel car)
        {
            _dbContext.Cars.Add(car);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<CarModel> UpdateCar(Guid carToModifyGuid, CarModel car)
        {
            var carToModify = await _dbContext.Cars.FirstOrDefaultAsync(c => c.CarGuid == carToModifyGuid);

            if (carToModify == null)
            {
                return null;
            }

            carToModify.CarGuid = carToModifyGuid;

            carToModify.Make = car.Make;
            carToModify.Model = car.Model;
            carToModify.FabricationYear = car.FabricationYear;
            carToModify.CubicCapacity = car.CubicCapacity;
            carToModify.FuelType = car.FuelType;

            _dbContext.Cars.Update(carToModify);

            await _dbContext.SaveChangesAsync();

            return carToModify;
        }

        public async Task<IEnumerable<CarModel>> GetAllCars()
        {
            return await _dbContext.Cars.ToListAsync();
        }
        public async Task<CarModel> GetCarByGuid(Guid carGuid)
        {
            var car = await _dbContext.Cars.FirstOrDefaultAsync(c => c.CarGuid == carGuid);
            return car;
        }

        public async Task DeleteCarByGuid(Guid carGuid)
        {
            var car = await GetCarByGuid(carGuid);
            if (car != null) 
            { 
                _dbContext.Cars.Remove(car);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
