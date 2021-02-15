using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.API;

namespace DataAccess.Models
{
	public class LoggedUser
	{
		[Required]
		public UserModel User { get; set; }

		[Required]
		public string Token { get; set; }

		public LoggedUser(User user) {
			User = new UserModel(user);
		}
	}
}