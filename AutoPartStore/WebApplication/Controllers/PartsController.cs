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
                return NotFound(new { message = "There is no car with the given Guid!" }); 
            }

            await _partRepository.CreatePart(partModel);

            return CreatedAtAction(nameof(CreatePart), new { id = partModel.PartGuid }, partModel);
        }

        [HttpPut("/UpdatePart/{partToModifyGuid}")]
        public async Task<ActionResult<PartModel>> UpdatePart(Guid partToModifyGuid, [FromBody] PartModel partModel)
        {
            var response = await _partRepository.UpdatePart(partToModifyGuid, partModel);

            CarModel existingCar = await _carRepository.GetCarByGuid(partModel.FK_CarGuid);

            if (existingCar == null)
            {
                return NotFound(new { message = "There is no car with the given Guid!" });
            }

            if (response == null)
            {
                return NotFound(new { message = "There is no part with the given Guid!" });
            }

            return Ok(response);
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

        [HttpDelete("/DeletePartByGuid/{partToDeleteGuid}")]
        public async Task<IActionResult> DeletePartByGuid(Guid partToDeleteGuid)
        {
            var existingPart = await _partRepository.GetPartByGuid(partToDeleteGuid);

            if (existingPart == null)
            {
                return NotFound(new { message = "There is no part with the given Guid!" });
            }

            await _partRepository.DeletePartByGuid(existingPart.PartGuid);

            return Ok();
        }

        [HttpGet("/GetAllPartsWithCars")]
        public async Task<ActionResult<IEnumerable<PartWithCar>>> GetAllPartsWithCars()
        {
            IEnumerable<PartWithCar> partsWithCars = await _partRepository.GetAllPartsWithCars();

            return partsWithCars.ToArray();
        }
    }
}
