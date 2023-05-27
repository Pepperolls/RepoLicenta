using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public class PartsController : ControllerBase
    {
        private readonly IPartRepository _partRepository;
        private readonly ICarRepository _carRepository;

        public PartsController(IPartRepository partRepository, ICarRepository carRepository)
        {
            _partRepository = partRepository;
            _carRepository = carRepository;
        }

        [HttpPost("/CreatePart")]
        public async Task<ActionResult<PartModel>> CreatePart([FromBody] PartModel partModel)
        {
            CarModel existingCar = await _carRepository.GetCarByGuid(partModel.FK_CarGuid);

            if (existingCar == null)
            { 
                return BadRequest(new { message = "The referenced car Guid does not exist!" }); 
            }

            await _partRepository.CreatePart(partModel);

            return CreatedAtAction(nameof(CreatePart), new { id = partModel.PartGuid }, partModel);
        }

        [HttpGet("/GetAllParts")]
        public async Task<ActionResult<IEnumerable<PartModel>>> GetAllParts()
        {
            IEnumerable<PartModel> partList = await _partRepository.GetAllParts();

            return partList.ToArray();
        }

        [HttpGet("/GetPartByGuid/{partGuid}")]
        public async Task<ActionResult<PartModel>> GetPartByGuid(Guid partGuid)
        {
            var part = await _partRepository.GetPartByGuid(partGuid);

            return part;
        }

        [HttpDelete("/DeletePartByGuid/{partGuid}")]
        public async Task<IActionResult> DeletePartByGuid(Guid partGuid)
        {
            var existingPart = _partRepository.GetPartByGuid(partGuid);

            if (existingPart == null)
            {
                return NotFound();
            }

            await _partRepository.DeletePartByGuid(existingPart.Result.PartGuid);

            return NoContent();
        }

        [HttpGet("/GetAllPartsWithCars")]
        public async Task<ActionResult<IEnumerable<PartWithCar>>> GetAllPartsWithCars()
        {
            IEnumerable<PartWithCar> partsWithCars = await _partRepository.GetAllPartsWithCars();

            return partsWithCars.ToArray();
        }
    }
}
