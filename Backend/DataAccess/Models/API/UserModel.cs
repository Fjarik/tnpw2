using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models.API
{
	public class UserModel
	{
		[Required]
		public string UserName { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		public UserModel() { }

		public UserModel(User u) {
			UserName = u?.UserName;
			Email = u?.Email;
			FirstName = u?.FirstName;
			LastName = u?.LastName;
		}
	}
}