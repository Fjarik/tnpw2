using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models
{
	public class Image
	{
		[BsonId]
		public Guid Id { get; set; }

		[Required]
		public string Base64 { get; set; }

		[Required]
		public string Format { get; set; }

		[BsonRepresentation(BsonType.DateTime)]
		public DateTime Uploaded { get; set; }

		public Image() { }

		public Image(string base64, string format) {
			Base64 = base64;
			Format = format;
			Uploaded = DateTime.Now.ToUniversalTime();
		}
	}
}