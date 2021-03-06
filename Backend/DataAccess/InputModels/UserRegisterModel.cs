﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.InputModels
{
	public class UserRegisterModel
	{
		[Required]
		public string Email { get; set; }

		[Required]
		public string UserName { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		public string Password { get; set; }
	}
}