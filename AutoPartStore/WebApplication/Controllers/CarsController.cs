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
        private readonly IPartRepository _partRepository;

        public CarsController(ICarRepository carRepository, IPartRepository partRepository)
        {
            _carRepository = carRepository;
            _partRepository = partRepository;
        }

        [HttpPost]
        public IActionResult CreateCar(string make, string model, int fabricationYear, int cubicCapacity, string fuelType)
        {
            var carModel = new CarModel(make, model, fabricationYear, cubicCapacity, fuelType)
            {
                Make = make,
                Model = model,
                FabricationYear = fabricationYear,
                CubicCapacity = cubicCapacity,
                FuelType = fuelType,
                Parts = new List<PartModel>()
            };

            _carRepository.CreateCar(carModel);

            return CreatedAtAction(nameof(CreateCar), new { id = carModel.CarModelId }, carModel);
        }

        [HttpGet]
        public ActionResult<IEnumerable<CarModel>> GetAllCars()
        {
            IEnumerable<CarModel> carList = _carRepository.GetAllCars();

            return carList.ToArray();
        }

        [HttpGet("/Cars/withParts")]
        public ActionResult<IEnumerable<CarModel>> GetAllCarsWithParts()
        {
            IEnumerable<CarModel> carList = _carRepository.GetAllCarsWithParts();

            return carList.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<CarModel> GetCar(int id)
        {
            var car = _carRepository.GetCar(id);

            return car;
        }

        [HttpGet("{id}/parts")]
        public ActionResult<IEnumerable<PartModel>> GetPartsOfCar(int id)
        {
            IEnumerable<PartModel> partList = _partRepository.GetPartsOfCar(id);

            return partList.ToArray();
        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, string partName, decimal partPrice, string partCategory, 
            string partDescription, string partImgUrl)
        {
            CarModel existingCar = _carRepository.GetCar(id);

            if (existingCar is null)
                return NotFound();

            PartModel part = new PartModel(partName, partPrice, partCategory, partDescription, partImgUrl, existingCar);

            _carRepository.AddPartToCar(id, part);

            _carRepository.PersisteCar(existingCar);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingCar = _carRepository.GetCar(id);

            if (existingCar is null)
                return NotFound();

            _carRepository.DeleteCar(id);

            return NoContent();
        }

    }
}
