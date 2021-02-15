using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Models.API;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly IUserService _userService;

		public UsersController(IUserService userService) {
			_userService = userService;
		}

		[HttpGet]
		[Route("me")]
		public async Task<ActionResult<UserModel>> MeAsync() {
			var res = await _userService.GetLoggedUserAsync();
			if (res == null) {
				return Unauthorized();
			}

			return Ok(res);
		}
	}
}