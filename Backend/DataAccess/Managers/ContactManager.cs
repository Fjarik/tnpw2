using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DataAccess.Managers
{
	public class ContactManager
	{
		private readonly IMongoCollection<Contact> _contacts;
		private readonly User _currentUser;
		private readonly UserManager<User> _userManager;

		public ContactManager(IMongoCollection<Contact> contacts, User currentUser, UserManager<User> userManager) {
			_contacts = contacts;
			_currentUser = currentUser;
			_userManager = userManager;
		}

		public async Task<List<Contact>> GetUserContactsAsync() {
			var cursor = await _contacts.FindAsync(x => _currentUser.ContactIds.Contains(x.Id));
			return await cursor.ToListAsync();
		}

		public async Task<Contact> CreateOrUpdateAsync(Contact contact) {
			if (contact.Id == ObjectId.Empty) {
				await _contacts.InsertOneAsync(contact);

				_currentUser.ContactIds.Add(contact.Id);
				await _userManager.UpdateAsync(_currentUser);
			} else {
				await _contacts.ReplaceOneAsync(x => x.Id == contact.Id, contact);
			}
			return contact;
		}

		public Task<bool> DeleteAsync(Contact contact) {
			return DeleteAsync(contact?.Id ?? ObjectId.Empty);
		}

		public async Task<bool> DeleteAsync(ObjectId id) {
			if (id == ObjectId.Empty) {
				return false;
			}
			var res = await _contacts.DeleteOneAsync(x => x.Id == id);
			return res.DeletedCount == 1;
		}
	}
}