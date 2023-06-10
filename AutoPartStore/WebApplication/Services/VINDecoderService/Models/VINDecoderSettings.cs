namespace WebApplication.Services.VINDecoderService.Models
{
    public class VINDecoderSettings
    {
        public string ApiBaseUrl { get; set; }
        public string ApiKey { get; set; }
        public string SecretKey { get; set; }
        public string ActionId { get; set; } //usually 'decode'
    }
}
