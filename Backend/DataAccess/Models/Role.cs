using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;

namespace DataAccess.Models
{
	public class Role : MongoRole<Guid>
	{
		public Role() : base() { }
		public Role(string name) : base(name) { }
	}
}