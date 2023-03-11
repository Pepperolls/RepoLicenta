using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        public IActionResult CreateUser(string email, string password, string firstName, string lastName, int personalIdNo)
        {
            var userModel = new UserModel(email, password, firstName, lastName, personalIdNo)
            {
                Email = email,
                Password = password,
                FirstName = firstName,
                LastName = lastName,
                PersonalIdNo = personalIdNo
            };

            _userRepository.CreateUser(userModel);

            return CreatedAtAction(nameof(CreateUser), new { id = userModel.UserModelId }, userModel);
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
