using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models
{
    public class UserModel
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsTwoFactorAuthenticationEnabled { get; set; }

        public UserModel()
        {
            UserId = Guid.NewGuid();
        }

        public UserModel(string username, string password, string email, string firstName, string lastName, string country, string city, string zipCode, string address, string phoneNumber)
        {
            UserId = Guid.NewGuid();
            Username = username;
            Password = password;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Country = country;
            City = city;
            ZipCode = zipCode;
            Address = address;
            PhoneNumber = phoneNumber;
            IsAdmin = false;
            IsTwoFactorAuthenticationEnabled = false;
        }
    }
}
