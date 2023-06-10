using System.Text.Json;
using System.Threading.Tasks;

namespace WebApplication.Services.VINDecoderService.Interfaces
{
    public interface IVINDecoderService
    {
        Task<string> DecodeVIN(string url);
    }
}
