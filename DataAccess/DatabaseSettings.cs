using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
	public class DatabaseSettings : IDatabaseSettings
	{
		public string UsersCollectionName { get; set; }
		public string ContactsCollectionName { get; set; }
		public string ConnectionString { get; set; }
		public string DatabaseName { get; set; }
	}

	public interface IDatabaseSettings
	{
		string UsersCollectionName { get; set; }

		string ContactsCollectionName { get; set; }

		string ConnectionString { get; set; }

		string DatabaseName { get; set; }
	}
}