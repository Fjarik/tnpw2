﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
	public class LoginInput
	{
		[Required]
		public string Username { get; set; }

		[Required]
		public string Password { get; set; }
	}
}