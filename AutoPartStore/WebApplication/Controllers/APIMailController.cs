using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Services.EmailService.Interfaces;
using WebApplication.Services.EmailService.Models;

[Route("[controller]")]
[ApiController]
public class MailAPIController : ControllerBase
{
    private readonly IAPIMailService _apiMailService;

    //injecting the IMailService into the constructor
    public MailAPIController(IAPIMailService apiMailService)
    {
        _apiMailService = apiMailService;
    }

    [HttpPost("/SendEmailAsync")]
    public async Task<bool> SendEmailAsync(MailData mailData)
    {
        return await _apiMailService.SendEmailAsync(mailData);
    }

    [HttpPost("/SendHTMLEmailAsync")]
    public async Task<bool> SendHTMLEmailAsync([FromBody] OrderModel orderModel)
    {
        return await _apiMailService.SendHTMLEmailAsync(orderModel);
    }

}