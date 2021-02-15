using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.InputModels;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	[ApiController]
	[AllowAnonymous]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;

		public AuthController(IAuthService authService) {
			_authService = authService;
		}

		[HttpPost]
		[Route("register")]
		public async Task<ActionResult<bool>> Register([FromBody] UserRegisterModel model) {
			if (!ModelState.IsValid) {
				return BadRequest(ModelState);
			}

			var res = await _authService.RegisterAsync(model);
			if (!res.Success) {
				return BadRequest(res.Errors);
			}

			return res.Success && res.Content;
		}

		[HttpPost]
		[Route("login")]
		public async Task<ActionResult<LoggedUser>> Login([FromForm] string username, [FromForm] string password) {
			if (string.IsNullOrWhiteSpace(username)) {
				return BadRequest("Username cannot be empty");
			}
			if (string.IsNullOrWhiteSpace(password)) {
				return BadRequest("Password cannot be empty");
			}

			var res = await _authService.LoginAsync(username, password);
			if (!res.Success) {
				return BadRequest(res.Errors);
			}

			return res.Content;
		}

		[HttpPost]
		[Route("logout")]
		[Authorize]
		public async Task<ActionResult> Logout() {
			await _authService.LogoutAsync();
			return Ok();
		}
	}
}