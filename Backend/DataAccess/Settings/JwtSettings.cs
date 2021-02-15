using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace DataAccess.Settings
{
	public class JwtSettings
	{
		public string Issuer { get; set; }

		public string Secret { get; set; }

		public int ExpirationInDays { get; set; }

		public SymmetricSecurityKey SecretKey => new(Encoding.UTF8.GetBytes(this.Secret));
	}
}