using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController()
        {
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserModel>> GetAllUsers()
        {
            IEnumerable<UserModel> userList = _userRepository.GetAllUsers();

            return userList.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<UserModel> GetUser(int id)
        {
            var user = _userRepository.GetUser(id);

            return user;
        }

        [HttpPost]
        public IActionResult CreateUser(string username, string password, string email, string firstName, string lastName)
        {
            if(_userRepository.GetUserByUsername(username) != null) 
            {
                return BadRequest();
            }

            var userModel = new UserModel
            {
                Username = username,
                Password = password,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
            };

            _userRepository.CreateUser(userModel);

            return CreatedAtAction(nameof(CreateUser), new { id = userModel.UserId }, userModel);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingUser = _userRepository.GetUser(id);

            if (existingUser is null)
                return NotFound();

            _userRepository.DeleteUser(id);

            return NoContent();
        }
    }
}
