using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models.API
{
	public class ContactModel : IValidatableObject
	{
		[Required]
		[BsonId]
		public Guid Id { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[EmailAddress]
		public string Email { get; set; }

		public string NickName { get; set; }

		public string Number { get; set; }

		[BsonRepresentation(BsonType.DateTime)]
		[BsonDateTimeOptions(DateOnly = true)]
		public DateTime? BirthDate { get; set; }

		public IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> Validate(
			ValidationContext validationContext) {
			if (string.IsNullOrWhiteSpace(NickName)) {
				NickName = null;
			}
			if (string.IsNullOrWhiteSpace(Number)) {
				Number = null;
			}
			if (string.IsNullOrWhiteSpace(Email)) {
				Email = null;
			}
			if (BirthDate != null && BirthDate > DateTime.Now) {
				yield return new System.ComponentModel.DataAnnotations.ValidationResult(
					"Birth date must be before now!", new[] {nameof(BirthDate)});
			}
		}

		public Contact ToContact() {
			return new() {
				Id = Id,
				FirstName = FirstName,
				LastName = LastName,
				NickName = NickName,
				Email = Email,
				Number = Number,
				BirthDate = BirthDate
			};
		}
	}
}