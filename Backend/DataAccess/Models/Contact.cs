using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models
{
	public class Contact : IValidatableObject
	{
		[BsonId]
		public Guid Id { get; set; }

		public Guid UserId { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		public string NickName { get; set; }

		public string Number { get; set; }

		[BsonRepresentation(BsonType.DateTime)]
		[BsonDateTimeOptions(DateOnly = true)]
		public DateTime? BirthDate { get; set; }

		public Image Image { get; set; }

		public IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> Validate(
			ValidationContext validationContext) {
			if (string.IsNullOrWhiteSpace(NickName)) {
				NickName = null;
			}
			if (string.IsNullOrWhiteSpace(Number)) {
				Number = null;
			}
			if (BirthDate != null && BirthDate > DateTime.Now) {
				yield return new System.ComponentModel.DataAnnotations.ValidationResult(
					"Birth date must be less then Now!", new[] {nameof(BirthDate)});
			}
		}
	}
}