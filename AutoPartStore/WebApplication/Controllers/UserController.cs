using Google.Authenticator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories;
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

            await _userRepository.CreateUser(user);

            return CreatedAtAction(nameof(CreateUser), new { id = user.UserId }, user);
        }

        [HttpPut("/UpdateUser/{userToModifyGuid}")]
        public async Task<ActionResult<UserController>> UpdateUser(Guid userToModifyGuid, [FromBody] UserModel userModel)
        {
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

            return userList.ToArray();
        }

        [HttpGet("/GetUserByGuid/{userGuid}")]
        public async Task<ActionResult<UserModel>> GetUserByGuid(Guid userGuid)
        {
            var user = await _userRepository.GetUserByGuid(userGuid);

            return user;
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

            return NoContent();
        }

        [HttpPost("/LoginUser/{usernameOrEmail}/{password}")]
        public async Task<ActionResult<UserModel>> LoginUser(string usernameOrEmail, string password)
        {
            var user = isValidEmail(usernameOrEmail) ? 
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

        private bool isValidEmail(string email)
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
