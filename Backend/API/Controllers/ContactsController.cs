using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Models.API;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	[Authorize]
	[ApiController]
	public class ContactsController : ControllerBase
	{
		private readonly IContactService _contactService;

		public ContactsController(IContactService contactService) {
			_contactService = contactService;
		}

		[HttpGet]
		[Route("getall")]
		public async Task<ApiActionResult<List<Contact>>> GetAllAsync() {
			var res = await _contactService.GetUserContactsAsync();

			return new ApiActionResult<List<Contact>>(res);
		}

		[HttpDelete, HttpDelete]
		[Route("delete")]
		public async Task<ApiActionResult<bool>> DeleteAsync(Guid id) {
			var res = await _contactService.DeleteAsync(id);

			return new ApiActionResult<bool>(res);
		}

		[HttpPost]
		[Route("create")]
		public async Task<ApiActionResult<Contact>> CreateAsync(ContactModel contact) {
			var res = await _contactService.CreateOrUpdateAsync(contact.ToContact());

			return new ApiActionResult<Contact>(res);
		}

		[HttpPost, HttpPut]
		[Route("update")]
		public async Task<ApiActionResult<Contact>> UpdateAsync(ContactModel contact, Guid contactId) {
			var res = await _contactService.CreateOrUpdateAsync(contact.ToContact(contactId));

			return new ApiActionResult<Contact>(res);
		}

		[HttpPost, HttpPut]
		[Route("photo")]
		public async Task<ApiActionResult<bool>> UpdatePictureAsync([FromForm]IFormFile picture, Guid contactId) {
			var res = await _contactService.UpdatePictureAsync(picture, contactId);

			return new ApiActionResult<bool>(res);
		}

		[HttpPost, HttpDelete]
		[Route("delphoto")]
		public async Task<ApiActionResult<bool>> DeletePictureAsync(Guid contactId)
		{
			var res = await _contactService.DeletePictureAsync(contactId);

			return new ApiActionResult<bool>(res);
		}
	}
}