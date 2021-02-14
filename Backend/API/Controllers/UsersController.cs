using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	[Authorize(Roles = "admin")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly IUserService _userService;

		public UsersController(IUserService userService) {
			_userService = userService;
		}

		[HttpGet]
		[Route("getall")]
		public ActionResult<List<User>> GetAll() {
			return _userService.GetAll();
		}
	}
}