using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Validators
{
	public class ContactValidator
	{
		public ValidationResult Validate(Contact contact) {
			if (contact == null) {
				return new ValidationResult(new ArgumentNullException(nameof(contact)));
			}
			if (string.IsNullOrWhiteSpace(contact.FirstName)) {
				return new ValidationResult(new ArgumentNullException(nameof(contact.FirstName)));
			}
			if (string.IsNullOrWhiteSpace(contact.LastName)) {
				return new ValidationResult(new ArgumentNullException(nameof(contact.LastName)));
			}
			return new ValidationResult();
		}

		public ValidationResult Validate(Contact contact, Contact original, Guid userId) {
			var res = Validate(contact);
			if (!res.IsSuccess) {
				return res;
			}
			res = Validate(original);
			if (!res.IsSuccess) {
				return res;
			}

			if (contact.Id == Guid.Empty) {
				return new ValidationResult();
			}

			if (original.UserId != userId) {
				return new ValidationResult(new UnauthorizedAccessException());
			}

			return new ValidationResult();
		}
	}
}