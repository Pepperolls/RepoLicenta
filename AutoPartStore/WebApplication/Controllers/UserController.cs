using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories;

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
            var existingUser = _userRepository.GetUserByGuid(userGuid);

            if (existingUser == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteUserByGuid(existingUser.Result.UserId);

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
