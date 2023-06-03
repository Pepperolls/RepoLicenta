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
        public async Task<ActionResult<CarModel>> CreateCar([FromBody] CarModel carModel)
        {
            await _carRepository.CreateCar(carModel);

            return CreatedAtAction(nameof(CreateCar), new { id = carModel.CarGuid }, carModel);
        }

        [HttpPut("/UpdateCar/{carToModifyGuid}")]
        public async Task<ActionResult<CarModel>> UpdateCar(Guid carToModifyGuid, [FromBody] CarModel carModel)
        {
            var response = await _carRepository.UpdateCar(carToModifyGuid, carModel);

            if (response == null)
            {
                return NotFound(new { message = "There is no car with the given Guid!" });
            }

            return Ok(response);
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

        [HttpDelete("/DeleteCarByGuid/{carToDeleteGuid}")]
        public async Task<IActionResult> DeleteCarByGuid(Guid carToDeleteGuid)
        {
            var existingCar = await _carRepository.GetCarByGuid(carToDeleteGuid);

            if (existingCar == null)
            {
                return NotFound(new { message = "There is no car with the given Guid!" });
            }

            await _carRepository.DeleteCarByGuid(existingCar.CarGuid);

            return Ok();
        }
    }
}
