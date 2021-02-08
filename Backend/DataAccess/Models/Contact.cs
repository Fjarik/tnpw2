using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models
{
	public class Contact
	{
		[BsonId]
		[BsonRepresentation((BsonType.ObjectId))]
		public string Id { get; set; }

		[Required] public string FirstName { get; set; }

		[Required] public string LastName { get; set; }

		public string NickName { get; set; }

		public int Prefix { get; set; }

		public string Number { get; set; }

		[BsonRepresentation(BsonType.DateTime)]
		public DateTime BirthDate { get; set; }
	}
}