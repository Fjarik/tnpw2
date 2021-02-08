using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess.Interfaces
{
	public interface IUserService
	{
		List<User> GetAll();
		Task<User> GetAsync(string id);
		Task<User> CreateAsync(User user);
		Task UpdateAsync(string id, User user);
		Task RemoveAsync(User user);
		Task RemoveAsync(string id);
	}
}