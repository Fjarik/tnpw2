using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Settings
{
	public class DatabaseSettings
	{
		public string UsersCollectionName { get; set; }
		public string ConnectionString { get; set; }
		public string DatabaseName { get; set; }
	}
}