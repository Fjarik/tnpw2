using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace DataAccess.Services
{
	public abstract class BaseService
	{
		private readonly ILogger _logger;
		private readonly IAuthService _authService;
		private readonly IHttpContextAccessor _httpContextAccessor;

		protected BaseService(ILogger logger, IAuthService authService, IHttpContextAccessor httpContextAccessor) {
			_logger = logger;
			_authService = authService;
			_httpContextAccessor = httpContextAccessor;
		}

		protected async Task<User> GetCurrentUserAsync() {
			var principal = _httpContextAccessor?.HttpContext?.User;
			if (principal == null || principal.Identity?.IsAuthenticated == false) {
				throw new UnauthorizedAccessException();
			}
			var result = await _authService.GetCurrentUserAsync(principal);
			if (!result.Success) {
				result.Errors.ForEach(x => _logger.LogError(x));
				return null;
			}
			return result.Content;
		}
	}
}