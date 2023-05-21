﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public interface IUserRepository
    {
        Task CreateUser(UserModel user);
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task DeleteUserByGuid(Guid userGuid);
        Task<UserModel> GetUserByGuid(Guid userGuid);
        Task<UserModel> GetUserByEmailAndPassword(string email, string password);
        Task<UserModel> GetUserByUsernameAndPassword(string username, string password);
        Task<UserModel> GetUserByEmail(string email);
        Task<UserModel> GetUserByUsername(string username);
    }
}