using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Services.EmailService.Models;

namespace WebApplication.Services.EmailService.Interfaces
{
    public interface IAPIMailService
    {
        Task<bool> SendEmailAsync(MailData mailData);
        Task<bool> SendHTMLEmailAsync(OrderModel orderModel);
    }
}
