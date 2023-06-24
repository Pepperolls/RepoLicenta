using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using WebApplication.Services.EmailService.Interfaces;
using WebApplication.Services.EmailService.Models;
using System.Net.Http.Json;
using Org.BouncyCastle.Asn1.Pkcs;
using WebApplication.Models;
using System.Text;
using WebApplication.Repositories.Interfaces;

public class APIMailService : IAPIMailService
{
    private readonly MailSettings _mailSettings;
    private readonly HttpClient _httpClient;
    private readonly IPartRepository _partRepository;

    public APIMailService(IOptions<MailSettings> mailSettingsOptions, IHttpClientFactory httpClientFactory, IPartRepository partRepository)
    {
        _mailSettings = mailSettingsOptions.Value;
        _httpClient = httpClientFactory.CreateClient("MailTrapApiClient");
        _partRepository = partRepository;
    }

    public async Task<bool> SendEmailAsync(MailData mailData)
    {
        var apiEmail = new
        {
            From = new { Email = _mailSettings.SenderEmail, Name = _mailSettings.SenderEmail },
            To = new[] { new { Email = mailData.EmailToId, Name = mailData.EmailToName } },
            Subject = mailData.EmailSubject,
            Text = mailData.EmailBody
        };

        var httpResponse = await _httpClient.PostAsJsonAsync("send", apiEmail);

        var responseJson = await httpResponse.Content.ReadAsStringAsync();
        var response = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseJson);

        if (response != null && response.TryGetValue("success", out object? success) && success is bool boolSuccess && boolSuccess)
        {
            return true;
        }

        return false;
    }

    public async Task<bool> SendOrderEmailAsync(OrderModel orderModel)
    {
        string filePath = Directory.GetCurrentDirectory() + "\\Services\\EmailService\\Templates\\EmailTemplate.html";

        string htmlBody = File.ReadAllText(filePath);

        string orderShippingAddress = $"{orderModel.UserAddress}, {orderModel.UserCity}, {orderModel.UserZipCode}, {orderModel.UserCountry}";

        string populatedHtml = htmlBody.Replace("{OrderDate}", DateTime.Now.ToString())
                                   .Replace("{CustomerName}", $"{orderModel.UserFirstName} {orderModel.UserLastName}")
                                   .Replace("{CustomerEmail}", orderModel.UserEmail)
                                   .Replace("{PaymentMethod}", "Cash")
                                   .Replace("{ShippingAddress}", orderShippingAddress)
                                   .Replace("{OrderItems}", await GetOrderItemsHtml(orderModel.OrderItems))
                                   .Replace("{TotalAmount}", orderModel.TotalPrice.ToString("F2"));
        //.Replace("{OrderNumber}", mailData.OrderNumber)

        var apiEmail = new
        {
            From = new { Email = _mailSettings.SenderEmail, Name = _mailSettings.SenderEmail },
            To = new[] { new { Email = orderModel.UserEmail, Name = $"{orderModel.UserFirstName} {orderModel.UserLastName}" } },
            Subject = "CarLounge Order Confirmation",
            Html = populatedHtml
        };

        var httpResponse = await _httpClient.PostAsJsonAsync("send", apiEmail);

        var responseJson = await httpResponse.Content.ReadAsStringAsync();
        var response = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseJson);

        if (response != null && response.TryGetValue("success", out object? success) && success is bool boolSuccess && boolSuccess)
        {
            return true;
        }

        return false;
    }

    private async Task<string> GetOrderItemsHtml(List<OrderItemModel> orderItemModelsList)
    {
        StringBuilder sb = new StringBuilder();

        foreach (var orderItemModel in orderItemModelsList)
        {
            var orderItem = await _partRepository.GetPartByGuid(orderItemModel.PartModelGuid);

            sb.Append("<tr>");
            sb.AppendFormat("<td>{0}</td>", orderItem.Name);
            sb.AppendFormat("<td>{0}</td>", orderItemModel.Quantity);
            sb.AppendFormat("<td>{0}</td>", orderItem.Price);
            sb.AppendFormat("<td>{0}</td>", orderItemModel.Quantity * orderItem.Price);
            sb.Append("</tr>");
        }

        return sb.ToString();
    }
}