using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
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
		private readonly RoleManager<MongoRole> _roleManager;
		private readonly SignInManager<User> _signInManager;

		public UserService(IDatabaseSettings settings, RoleManager<MongoRole> roleManager,
			UserManager<User> userManager, IMongoCollection<User> users, SignInManager<User> signInManager)
		{
			_roleManager = roleManager;
			_userManager = userManager;
			_users = users;
			_signInManager = signInManager;

			//var client = new MongoClient(settings.ConnectionString);
			//var database = client.GetDatabase(settings.DatabaseName);

			//_users = database.GetCollection<User>(settings.UsersCollectionName);
		}

		public List<User> GetAll()
		{
			return _userManager.Users.ToList();
		}

		public async Task<User> GetAsync(string id)
		{
			var users = await _users.FindAsync(x => x.Id.ToString() == id);
			return await users.FirstOrDefaultAsync();
		}

		public async Task<User> CreateAsync(User user)
		{
			await _users.InsertOneAsync(user);
			return user;
		}

		public async Task UpdateAsync(string id, User user)
		{
			await _users.ReplaceOneAsync(x => x.Id.ToString() == id, user);
		}

		public Task RemoveAsync(User user)
		{
			return RemoveAsync(user?.Id.ToString());
		}

		public async Task RemoveAsync(string id)
		{
			await _users.DeleteOneAsync(x => x.Id.ToString() == id);
		}

		public async Task<User> LoginAsync(string username, string password)
		{
			var user = await _userManager.FindByNameAsync(username);
			var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
			if (result.Succeeded)
			{
				if (await _signInManager.CanSignInAsync(user))
				{
					await _signInManager.SignInAsync(user, true);
					return user;
				}
			}
			return null;
		}
	}
}