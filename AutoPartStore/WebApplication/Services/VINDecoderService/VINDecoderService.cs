using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WebApplication.Repositories;
using WebApplication.Services.EmailService.Models;
using WebApplication.Services.VINDecoderService.Interfaces;
using WebApplication.Services.VINDecoderService.Models;

namespace WebApplication.Services.VINDecoderService
{
    public class VINDecoderService : IVINDecoderService
    {
        private readonly VINDecoderSettings _vinDecoderSettings;
        private readonly string _apiKey;
        private readonly string _secretKey;
        private readonly string _baseUrl;
        private readonly string _decodeAction;

        public VINDecoderService(IOptions<VINDecoderSettings> vinDecoderSettings)
        {
            _vinDecoderSettings = vinDecoderSettings.Value;
            _apiKey = _vinDecoderSettings.ApiKey;
            _secretKey = _vinDecoderSettings.SecretKey;
            _baseUrl = _vinDecoderSettings.ApiBaseUrl;
            _decodeAction = _vinDecoderSettings.ActionId;
        }

        public async Task<string> DecodeVIN(string vin)
        {
            string controlSum = CalculateControlSum(vin, _apiKey, _secretKey, _decodeAction);
            string url = $"{_baseUrl}/{_apiKey}/{controlSum}/{_decodeAction}/{vin}.json";

            using (HttpClient httpClient = new HttpClient())
            {
                using (HttpResponseMessage response = await httpClient.GetAsync(url))
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    var jsonObject = JsonDocument.Parse(jsonResponse).RootElement;
                    JsonElement decodeElement = jsonObject.GetProperty("decode");

                    return decodeElement.ToString();
                }
            }
        }

        private string CalculateControlSum(string vin, string apiKey, string secretKey, string decodeAction)
        {
            string data = $"{vin}|{decodeAction}|{apiKey}|{secretKey}";

            using (SHA1 sha1 = SHA1.Create())
            {
                byte[] hashBytes = sha1.ComputeHash(Encoding.UTF8.GetBytes(data));
                string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hashString.Substring(0, 10);
            }
        }
    }
}
