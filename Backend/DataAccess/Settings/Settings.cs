using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Settings
{
	public class Settings
	{
		public DatabaseSettings Database { get; set; }
		public JwtSettings Jwt { get; set; }
	}
}