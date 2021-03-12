using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Extensions;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Validators;
using Microsoft.AspNetCore.Http;
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
				var original = await GetByIdAsync(contact.Id);
				if (original == null) {
					throw new ArgumentNullException(nameof(original), "Original contact not found");
				}
				if (original.UserId != _currentUser.Id) {
					throw new UnauthorizedAccessException();
				}

				contact.UserId = _currentUser.Id;
				contact.Image = original.Image;

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

		public async Task<bool> UpdatePictureAsync(IFormFile file, Guid contactId) {
			_logger.LogInformation("ContactManager.UpdatePictureAsync().............");
			if (file == null) {
				_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
				throw new ArgumentNullException(nameof(file));
			}
			if (!file.IsPicture()) {
				_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
				throw new ArgumentOutOfRangeException(nameof(file), "Give file is not a supported picture.");
			}
			if (file.Length < 1) {
				_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
				throw new ArgumentNullException(nameof(file), "Invalid file length.");
			}
			if (file.Length > 1024) {
				_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
				throw new ArgumentOutOfRangeException(nameof(file), "File exceeded maximum size.");
			}

			var type = file.ContentType;
			var bytes = await file.GetBytesAsync();
			var base64 = Convert.ToBase64String(bytes);

			var image = new Image(base64, type);

			var res = await UpdatePictureAsync(image, contactId);

			_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
			return res;
		}

		private async Task<bool> UpdatePictureAsync(Image image, Guid contactId) {
			_logger.LogInformation("ContactManager.UpdatePictureAsync().............");
			if (image == null) {
				_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
				throw new ArgumentNullException(nameof(image));
			}
			if (contactId == Guid.Empty) {
				_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
				throw new ArgumentNullException(nameof(contactId));
			}
			var update = Builders<Contact>.Update.Set(x => x.Image, image);
			var res = await _contacts.UpdateOneAsync(x => x.Id == contactId && x.UserId == _currentUser.Id, update);

			_logger.LogInformation("ContactManager.UpdatePictureAsync()............. Done");
			return res.ModifiedCount == 1;
		}

		public async Task<bool> DeletePictureAsync(Guid contactId) {
			_logger.LogInformation("ContactManager.DeletePictureAsync().............");
			if (contactId == Guid.Empty) {
				_logger.LogInformation("ContactManager.DeletePictureAsync()............. Done");
				throw new ArgumentNullException(nameof(contactId));
			}
			var contact = await GetByIdAsync(contactId);
			if (contact == null) {
				_logger.LogInformation("ContactManager.DeletePictureAsync()............. Done");
				throw new ArgumentNullException(nameof(contact));
			}
			var update = Builders<Contact>.Update.Set(x => x.Image, null);
			var res = await _contacts.UpdateOneAsync(x => x.Id == contactId && x.UserId == _currentUser.Id, update);

			_logger.LogInformation("ContactManager.DeletePictureAsync()............. Done");
			return res.ModifiedCount == 1;
		}
	}
}