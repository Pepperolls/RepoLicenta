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

        public PartsController(IPartRepository partRepository)
        {
            _partRepository = partRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<PartModel>> GetAllParts()
        {
            IEnumerable<PartModel> partList = _partRepository.GetAllParts();

            return partList.ToArray();
        }

        [HttpGet("/Parts/withCars")]
        public ActionResult<IEnumerable<PartModel>> GetAllPartsWithCars()
        {
            IEnumerable<PartModel> partList = _partRepository.GetAllPartsWithCars();

            return partList.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<PartModel> GetPart(int id)
        {
            var part = _partRepository.GetPart(id);

            return part;
        }

        [HttpGet("{id}/car")]
        public ActionResult<PartModel> GetPartWithCar(int id)
        {
            var part = _partRepository.GetPartWithCar(id);

            return part;
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingPart = _partRepository.GetPart(id);

            if (existingPart is null)
                return NotFound();

            _partRepository.DeletePart(id);

            return NoContent();
        }
    }
}
