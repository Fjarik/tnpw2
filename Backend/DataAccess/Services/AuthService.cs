using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataAccess.InputModels;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DataAccess.Services
{
	public class AuthService : IAuthService
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly JwtSettings _jwtSettings;

		public AuthService(UserManager<User> userManager,
						   IOptions<Settings.Settings> settings,
						   SignInManager<User> signInManager) {
			_userManager = userManager;
			_signInManager = signInManager;
			_jwtSettings = settings.Value.Jwt;
		}

		public async Task LogoutAsync() {
			await _signInManager.SignOutAsync();
		}

		public async Task<UniversalResult<LoggedUser>> LoginAsync(string username, string password) {
			var user = await _userManager.FindByNameAsync(username);
			if (user == null) {
				return UniversalResult<LoggedUser>.Fail("Username or password is not correct");
			}

			var result = await _signInManager.PasswordSignInAsync(user, password, false, false);
			if (result.Succeeded) {
				var u = new LoggedUser(user) {
					Token = GenerateJwt(user)
				};

				return UniversalResult<LoggedUser>.Ok(u);
			}
			return UniversalResult<LoggedUser>.Fail("Username or password is not correct");
		}

		public async Task<UniversalResult<bool>> RegisterAsync(UserRegisterModel model) {
			var user = new User {
				FirstName = model.FirstName,
				LastName = model.LastName,
				Email = model.Email,
				UserName = model.UserName,
			};

			var errors = new List<string>();

			var res = await _userManager.CreateAsync(user, model.Password);
			if (res.Succeeded) {
				var roleRes = await _userManager.AddToRoleAsync(user, "user");
				if (roleRes.Succeeded) {
					return UniversalResult<bool>.Ok(true);
				}
				errors.AddRange(roleRes.Errors.Select(x => x.Description));
			}
			errors.AddRange(res.Errors.Select(x => x.Description));

			return UniversalResult<bool>.Fail(errors);
		}

		private string GenerateJwt(User user) {
			var claims = new List<Claim> {
				new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
				new(ClaimTypes.Name, user.UserName),
				new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new(ClaimTypes.NameIdentifier, user.Id.ToString())
			};

			var roleClaims = user.Roles.Select(r => new Claim(ClaimTypes.Role, r));
			claims.AddRange(roleClaims);

			claims.AddRange(user.Claims.Select(x=> x.ToClaim()));

			var creds = new SigningCredentials(_jwtSettings.SecretKey, SecurityAlgorithms.HmacSha256);
			var expires = DateTime.Now.AddDays(Convert.ToDouble(_jwtSettings.ExpirationInDays));

			var token = new JwtSecurityToken(
				issuer: _jwtSettings.Issuer,
				audience: _jwtSettings.Issuer,
				claims,
				expires: expires,
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}