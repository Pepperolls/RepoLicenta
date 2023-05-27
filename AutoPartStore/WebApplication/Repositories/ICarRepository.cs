using System;
using System.Collections.Generic;
using WebApplication.Models;
using System.Threading.Tasks;

namespace WebApplication.Repositories
{
    public interface ICarRepository
    {
        Task CreateCar(CarModel car);
        Task<IEnumerable<CarModel>> GetAllCars();
        Task<CarModel> GetCarByGuid(Guid carGuid);
        Task DeleteCarByGuid(Guid carGuid);
    }
}