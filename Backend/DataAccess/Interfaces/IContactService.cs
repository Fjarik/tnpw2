using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess.Interfaces
{
	public interface IContactService
	{
		Task<UniversalResult<List<Contact>>> GetUserContactsAsync();
		Task<UniversalResult<Contact>> CreateOrUpdateAsync(Contact contact);
		Task<UniversalResult<bool>> DeleteAsync(Contact contact);
	}
}