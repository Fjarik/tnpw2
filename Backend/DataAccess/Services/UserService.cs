using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Models.API;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace DataAccess.Services
{
	public class UserService : BaseService, IUserService
	{
		private readonly IMongoCollection<User> _users;
		private readonly ILogger<UserService> _logger;
		private readonly UserManager<User> _userManager;

		public UserService(ILogger<UserService> logger,
						   IAuthService authService,
						   IHttpContextAccessor httpContextAccessor,
						   UserManager<User> userManager,
						   IMongoCollection<User> users) : base(logger, authService, httpContextAccessor) {
			_logger = logger;
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

		public async Task<UserModel> GetLoggedUserAsync() {
			var user = await GetCurrentUserAsync();
			if (user == null) {
				return null;
			}
			return new UserModel(user);
		}
	}
}