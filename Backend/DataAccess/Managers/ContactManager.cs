using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Validators;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DataAccess.Managers
{
	public class ContactManager
	{
		private readonly ILogger _logger;
		private readonly IMongoCollection<Contact> _contacts;
		private readonly ContactValidator _contactValidator;
		private readonly User _currentUser;

		public ContactManager(ILogger logger, IMongoCollection<Contact> contacts, User currentUser,
							  ContactValidator contactValidator) {
			_logger = logger;
			_contacts = contacts;
			_currentUser = currentUser ?? throw new UnauthorizedAccessException();
			_contactValidator = contactValidator;
		}

		public async Task<Contact> GetByIdAsync(Guid contactId) {
			_logger.LogInformation("ContactManager.GetByIdAsync().............");
			var cursor = await _contacts.FindAsync(x => x.Id == contactId);

			var result = await cursor.FirstOrDefaultAsync();

			if (result.UserId != _currentUser.Id) {
				throw new UnauthorizedAccessException();
			}

			_logger.LogInformation("ContactManager.GetByIdAsync()............. Done");
			return result;
		}

		public async Task<List<Contact>> GetUserContactsAsync() {
			_logger.LogInformation("ContactManager.GetUserContactsAsync().............");
			var cursor = await _contacts.FindAsync(x => x.UserId == _currentUser.Id);
			var result = await cursor.ToListAsync();

			_logger.LogInformation("ContactManager.GetUserContactsAsync()............. Done");
			return result;
		}

		public async Task<Contact> CreateOrUpdateAsync(Contact contact) {
			_logger.LogInformation("ContactManager.CreateOrUpdateAsync().............");

			var res = await _contactValidator.ValidateAsync(contact);
			if (!res.IsSuccess) {
				throw res.Exception;
			}

			if (contact.Id == Guid.Empty) {
				contact.UserId = _currentUser.Id;

				await _contacts.InsertOneAsync(contact);
			} else {
				await _contacts.ReplaceOneAsync(x => x.Id == contact.Id, contact);
			}

			_logger.LogInformation("ContactManager.CreateOrUpdateAsync()............. Done");
			return contact;
		}

		public async Task<bool> DeleteAsync(Guid id) {
			_logger.LogInformation("ContactManager.DeleteAsync().............");
			if (id == Guid.Empty) {
				_logger.LogInformation("ContactManager.DeleteAsync()............. Done");
				return false;
			}
			var res = await _contacts.DeleteOneAsync(x => x.Id == id &&
														  x.UserId == _currentUser.Id);

			_logger.LogInformation("ContactManager.DeleteAsync()............. Done");
			return res.DeletedCount == 1;
		}
	}
}