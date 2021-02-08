using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;

namespace DataAccess.Services
{
	public class UserService : IUserService
	{
		private readonly IMongoCollection<User> _users;
		private readonly UserManager<User> _userManager;

		public UserService(UserManager<User> userManager, IMongoCollection<User> users) {
			_userManager = userManager;
			_users = users;
		}

		public List<User> GetAll() {
			return _userManager.Users.ToList();
		}

		public async Task<User> GetAsync(Guid id) {
			var users = await _users.FindAsync(x => x.Id == id);
			return await users.FirstOrDefaultAsync();
		}

		public async Task<User> CreateAsync(User user) {
			await _users.InsertOneAsync(user);
			return user;
		}

		public async Task UpdateAsync(Guid id, User user) {
			await _users.ReplaceOneAsync(x => x.Id == id, user);
		}

		public Task RemoveAsync(User user) {
			return RemoveAsync(user?.Id ?? Guid.Empty);
		}

		public async Task RemoveAsync(Guid id) {
			await _users.DeleteOneAsync(x => x.Id == id);
		}
	}
}