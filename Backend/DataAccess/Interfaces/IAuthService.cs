using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.InputModels;
using DataAccess.Models;

namespace DataAccess.Interfaces
{
	public interface IAuthService
	{
		Task LogoutAsync();

		Task<UniversalResult<LoggedUser>> LoginAsync(string username, string password);

		Task<UniversalResult<bool>> RegisterAsync(UserRegisterModel model);
	}
}