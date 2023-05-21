using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AutoPartsContext _dbContext;

        public UserRepository(AutoPartsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateUser(UserModel user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task DeleteUserByGuid(Guid userGuid)
        {
            var user = await GetUserByGuid(userGuid);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<UserModel> GetUserByGuid(Guid userGuid)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == userGuid);
            return await Task.FromResult(user);
        }

        public async Task<UserModel> GetUserByUsernameAndPassword(string username, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username && u.Password == password);
            return await Task.FromResult(user);
        }

        public async Task<UserModel> GetUserByEmailAndPassword(string email, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
            return await Task.FromResult(user);
        }

        public async Task<UserModel> GetUserByUsername(string username)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Username == username);
            return await Task.FromResult(user);
        }

        public async Task<UserModel> GetUserByEmail(string email)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            return await Task.FromResult(user);
        }
    }
}
