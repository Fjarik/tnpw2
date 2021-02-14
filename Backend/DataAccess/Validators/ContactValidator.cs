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
		private readonly IContactService _contactService;

		public ContactValidator(IContactService contactService) {
			_contactService = contactService;
		}

		public async Task<ValidationResult> ValidateAsync(Contact contact) {
			if (contact == null) {
				return new ValidationResult(new ArgumentNullException(nameof(contact)));
			}
			if (string.IsNullOrWhiteSpace(contact.FirstName)) {
				return new ValidationResult(new ArgumentNullException(nameof(contact.FirstName)));
			}
			if (string.IsNullOrWhiteSpace(contact.LastName)) {
				return new ValidationResult(new ArgumentNullException(nameof(contact.LastName)));
			}
			if (contact.Id == Guid.Empty) {
				return new ValidationResult();
			}
			var res = await _contactService.GetByIdAsync(contact.Id);
			if (!res.Success || res.Content == null) {
				return new ValidationResult(new Exception(res.Errors.FirstOrDefault()));
			}
			var original = res.Content;
			if (original.UserId != contact.UserId) {
				return new ValidationResult(new UnauthorizedAccessException());
			}

			return new ValidationResult();
		}
	}
}