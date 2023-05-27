using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository _carRepository;

        public CarsController(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        [HttpPost("/CreateCar")]
        public async Task<ActionResult<CarModel>> CreateCar(string make, string model, int fabricationYear, int cubicCapacity, string fuelType)
        {
            var carModel = new CarModel(make, model, fabricationYear, cubicCapacity, fuelType)
            {
                Make = make,
                Model = model,
                FabricationYear = fabricationYear,
                CubicCapacity = cubicCapacity,
                FuelType = fuelType
            };

            await _carRepository.CreateCar(carModel);

            return CreatedAtAction(nameof(CreateCar), new { id = carModel.CarGuid }, carModel);
        }

        [HttpGet("/GetAllCars")]
        public async Task<ActionResult<IEnumerable<CarModel>>> GetAllCars()
        {
            IEnumerable<CarModel> carList = await _carRepository.GetAllCars();

            return carList.ToArray();
        }

        [HttpGet("/GetCarByGuid/{carGuid}")]
        public async Task<ActionResult<CarModel>> GetCarByGuid(Guid carGuid)
        {
            var car = await _carRepository.GetCarByGuid(carGuid);

            return car;
        }

        [HttpDelete("/DeleteCarByGuid/{carGuid}")]
        public async Task<IActionResult> DeleteCarByGuid(Guid carGuid)
        {
            var existingCar = _carRepository.GetCarByGuid(carGuid);

            if (existingCar == null)
            {
                return NotFound();
            }

            await _carRepository.DeleteCarByGuid(existingCar.Result.CarGuid);

            return NoContent();
        }
    }
}
