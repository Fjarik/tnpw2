using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace API.Policy
{
	public class HasClaimRequirement : IAuthorizationRequirement
	{
		public string UserClaims { get; set; }

		public HasClaimRequirement(string userClaims)
		{
			UserClaims = userClaims ?? throw new ArgumentNullException(nameof(userClaims));
		}
	}
}