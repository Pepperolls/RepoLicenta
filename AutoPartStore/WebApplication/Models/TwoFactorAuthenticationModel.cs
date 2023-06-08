namespace WebApplication.Models
{
    public class TwoFactorAuthenticationModel
    {
        public string qrCode { get; set; }
        public string manualCode { get; set; }
    }
}
