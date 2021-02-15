using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models
{
	public class User : MongoUser<Guid>
	{
		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[BsonRepresentation(BsonType.DateTime)]
		public DateTime Created { get; set; }

		public string RegistrationIP { get; set; }

		public User() : base() { }
		public User(string userName) : base(userName) { }
	}
}