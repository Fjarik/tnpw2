using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Interfaces;
using DataAccess.Managers;
using DataAccess.Models;
using DnsClient.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace DataAccess.Services
{
	public class ContactService : BaseService, IContactService
	{
		private readonly ILogger<ContactService> _logger;
		private readonly IMongoCollection<Contact> _contacts;
		private ContactManager _manager;

		public ContactService(ILogger<ContactService> logger,
							  IAuthService authService,
							  IHttpContextAccessor httpContextAccessor,
							  IMongoCollection<Contact> contacts) : base(logger, authService, httpContextAccessor) {
			_logger = logger;
			_contacts = contacts;
		}

		public async Task<UniversalResult<Contact>> GetByIdAsync(Guid contactId) {
			await EnsureManagerAsync();
			try {
				var contacts = await _manager.GetByIdAsync(contactId);

				return UniversalResult<Contact>.Ok(contacts);
			} catch (Exception ex) {
				return UniversalResult<Contact>.Fail(ex.Message);
			}
		}

		public async Task<UniversalResult<List<Contact>>> GetUserContactsAsync() {
			await EnsureManagerAsync();

			try {
				var contacts = await _manager.GetUserContactsAsync();

				return UniversalResult<List<Contact>>.Ok(contacts);
			} catch (Exception ex) {
				return UniversalResult<List<Contact>>.Fail(ex.Message);
			}
		}

		public async Task<UniversalResult<Contact>> CreateOrUpdateAsync(Contact contact) {
			await EnsureManagerAsync();

			try {
				var result = await _manager.CreateOrUpdateAsync(contact);

				return UniversalResult<Contact>.Ok(result);
			} catch (Exception ex) {
				return UniversalResult<Contact>.Fail(ex.Message);
			}
		}

		public async Task<UniversalResult<bool>> DeleteAsync(Guid contactId) {
			await EnsureManagerAsync();

			try {
				var result = await _manager.DeleteAsync(contactId);

				return UniversalResult<bool>.Ok(result);
			} catch (Exception ex) {
				return UniversalResult<bool>.Fail(ex.Message);
			}
		}

		public async Task<UniversalResult<bool>> UpdatePictureAsync(IFormFile file, Guid contactId) {
			await EnsureManagerAsync();

			try {
				var result = await _manager.UpdatePictureAsync(file, contactId);

				return UniversalResult<bool>.Ok(result);
			} catch (Exception ex) {
				return UniversalResult<bool>.Fail(ex.Message);
			}
		}

		public async Task<UniversalResult<bool>> DeletePictureAsync(Guid contactId) {
			await EnsureManagerAsync();

			try {
				var result = await _manager.DeletePictureAsync(contactId);

				return UniversalResult<bool>.Ok(result);
			} catch (Exception ex) {
				return UniversalResult<bool>.Fail(ex.Message);
			}
		}

		private async Task EnsureManagerAsync() {
			if (_manager == null) {
				var user = await GetCurrentUserAsync();
				_manager = new ContactManager(_logger, _contacts, user);
			}
		}
	}
}