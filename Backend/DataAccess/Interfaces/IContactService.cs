using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
using MongoDB.Bson;

namespace DataAccess.Interfaces
{
	public interface IContactService
	{
		Task<UniversalResult<Contact>> GetByIdAsync(Guid contactId);
		Task<UniversalResult<List<Contact>>> GetUserContactsAsync();
		Task<UniversalResult<Contact>> CreateOrUpdateAsync(Contact contact);
		Task<UniversalResult<bool>> DeleteAsync(Guid contactId);
	}
}