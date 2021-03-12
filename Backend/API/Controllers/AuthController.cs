using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using DataAccess.InputModels;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

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
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[SwaggerResponse(200, Type = typeof(bool))]
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
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[SwaggerResponse(200, Type = typeof(LoggedUser))]
		public async Task<ActionResult<LoggedUser>> Login([FromBody] LoginInput login) {
			if (login == null) {
				return BadRequest("Input is empty");
			}
			if (string.IsNullOrWhiteSpace(login.Username)) {
				return BadRequest("Username cannot be empty");
			}
			if (string.IsNullOrWhiteSpace(login.Password)) {
				return BadRequest("Password cannot be empty");
			}

			var res = await _authService.LoginAsync(login.Username, login.Password);
			if (!res.Success) {
				return BadRequest(res.Errors);
			}

			return res.Content;
		}

		[Authorize]
		[HttpPost]
		[Route("logout")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(bool))]
		public async Task<ActionResult> Logout() {
			await _authService.LogoutAsync();
			return Ok();
		}
	}
}