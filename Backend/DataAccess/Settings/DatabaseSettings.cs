using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Settings
{
	public class DatabaseSettings
	{
		public string UsersCollectionName { get; set; }
		public string ContactsCollectionName { get; set; }
		public string ConnectionStringName { get; set; }
	}
}