using Google.Authenticator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories.Interfaces;
using static System.Runtime.CompilerServices.RuntimeHelpers;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("/CreateUser")]
        public async Task<ActionResult<UserModel>> CreateUser([FromBody] UserModel user)
        {
            var userByUsername = await _userRepository.GetUserByUsername(user.Username);
            var userByEmail = await _userRepository.GetUserByEmail(user.Email);

            if (userByUsername != null || userByEmail != null) 
            {
                return BadRequest(new { message = "E-mail or username already in use!" });
            }

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                user.Password = hashString;
            }
            await _userRepository.CreateUser(user);

            return CreatedAtAction(nameof(CreateUser), new { id = user.UserId }, user);
        }

        [HttpPut("/UpdateUser/{userToModifyGuid}")]
        public async Task<ActionResult<UserController>> UpdateUser(Guid userToModifyGuid, [FromBody] UserModel userModel, bool encryptPassword = true)
        {
            var userByUsername = await _userRepository.GetUserByUsername(userModel.Username);
            var userByEmail = await _userRepository.GetUserByEmail(userModel.Email);

            if (userByUsername != null && userByUsername.UserId != userToModifyGuid || userByEmail != null && userByEmail.UserId != userToModifyGuid)
            {
                return BadRequest(new { message = "E-mail or username already in use!" });
            }

            if (encryptPassword)
            {
                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(userModel.Password));
                    string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                    userModel.Password = hashString;
                }
            }

            var response = await _userRepository.UpdateUser(userToModifyGuid, userModel);

            if (response == null)
            {
                return NotFound(new { message = "There is no user with the given Guid!" });
            }

            return Ok(response);
        }

        [HttpGet("/GetAllUsers")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetAllUsers()
        {
            IEnumerable<UserModel> userList = await _userRepository.GetAllUsers();

            return Ok(userList.ToArray());
        }

        [HttpGet("/GetUserByGuid/{userGuid}")]
        public async Task<ActionResult<UserModel>> GetUserByGuid(Guid userGuid)
        {
            var user = await _userRepository.GetUserByGuid(userGuid);
            
            if(user == null)
            {
                return NotFound(new { message = "No user has been found with the given ID." });
            }

            return Ok(user);
        }


        [HttpDelete("/DeleteUserByGuid/{userGuid}")]
        public async Task<IActionResult> DeleteUserByGuid(Guid userGuid)
        {
            var existingUser = await _userRepository.GetUserByGuid(userGuid);

            if (existingUser == null)
            {
                return NotFound(new { message = "No user has been found with the given credentials." });
            }

            await _userRepository.DeleteUserByGuid(existingUser.UserId);

            return Ok();
        }

        [HttpPost("/LoginUser/{usernameOrEmail}/{password}")]
        public async Task<ActionResult<UserModel>> LoginUser(string usernameOrEmail, string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                password = hashString;
            }

            var user = IsValidEmail(usernameOrEmail) ? 
                await _userRepository.GetUserByEmailAndPassword(usernameOrEmail, password) :
                await _userRepository.GetUserByUsernameAndPassword(usernameOrEmail, password);

            if (user == null)
            {
                return BadRequest(new { message = "No user has been found with the given credentials." });
            }

            return Ok(user);
        }

        [HttpGet("/EnableTwoFactorAuthentication/{userEmail}")]
        public async Task<ActionResult<TwoFactorAuthenticationModel>> EnableTwoFactorAuthentication(string userEmail)
        {
            string key = $"VerySecretKey0812{userEmail}";

            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            SetupCode setupInfo = tfa.GenerateSetupCode("CarLounge", userEmail, key, false, 3);

            string qrCodeImageUrl = setupInfo.QrCodeSetupImageUrl;
            string manualEntrySetupCode = setupInfo.ManualEntryKey;

            var twoFactorSettings = new TwoFactorAuthenticationModel { qrCode = qrCodeImageUrl, manualCode = manualEntrySetupCode };

            var user = await _userRepository.GetUserByEmail(userEmail);
            user.IsTwoFactorAuthenticationEnabled = true;
            await _userRepository.UpdateUser(user.UserId, user);

            return await Task.FromResult<ActionResult<TwoFactorAuthenticationModel>>(twoFactorSettings);
        }

        [HttpPost("/CheckTwoFactorAuthentication/{twoFactorCode}/{userEmail}")]
        public ActionResult CheckTwoFactorAuthentication(string twoFactorCode, string userEmail)
        {
            string key = $"VerySecretKey0812{userEmail}";
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            bool result = tfa.ValidateTwoFactorPIN(key, twoFactorCode);

            if (result == false)
            {
                return BadRequest(new { message = "The code you have entered is incorrect." });
            }

            return Ok();
        }

        private bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }
    }
}
