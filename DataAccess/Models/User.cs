using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models
{
	public class User : MongoUser
	{
		[Required] public string FirstName { get; set; }

		[Required] public string LastName { get; set; }

		public ICollection<Contact> Contacts { get; set; }
	}
}