using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories;
using WebApplication.Services.VINDecoderService.Interfaces;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VINDecoderController : ControllerBase
    {
        private readonly IVINDecoderService _vinDecoderService;

        public VINDecoderController(IVINDecoderService vinDecoderService)
        {
            _vinDecoderService = vinDecoderService;
        }

        [HttpGet("/DecodeVIN/{vin}")]
        public async Task<ActionResult<string>> DecodeVIN(string vin)
        {
            string response = await _vinDecoderService.DecodeVIN(vin);
            return response;
        }
    }
}
