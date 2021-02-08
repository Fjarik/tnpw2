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
		Task<User> GetAsync(Guid id);
		Task<User> CreateAsync(User user);
		Task UpdateAsync(Guid id, User user);
		Task RemoveAsync(User user);
		Task RemoveAsync(Guid id);
	}
}