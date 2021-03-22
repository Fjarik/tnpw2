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
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
	[Consumes("application/json")]
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
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(ApiResult<List<Contact>>))]
		[SwaggerResponse(400, Type = typeof(ApiResult<List<Contact>>))]
		public async Task<ApiActionResult<List<Contact>>> GetAllAsync() {
			var res = await _contactService.GetUserContactsAsync();

			return new ApiActionResult<List<Contact>>(res);
		}

		[HttpDelete]
		[Route("delete")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(ApiResult<bool>))]
		[SwaggerResponse(400, Type = typeof(ApiResult<bool>))]
		public async Task<ApiActionResult<bool>> DeleteAsync(Guid id) {
			var res = await _contactService.DeleteAsync(id);

			return new ApiActionResult<bool>(res);
		}

		[HttpPost]
		[Route("createorupdate")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(ApiResult<Contact>))]
		[SwaggerResponse(400, Type = typeof(ApiResult<Contact>))]
		public async Task<ApiActionResult<Contact>> CreateOrUpdateAsync([FromBody] ContactModel contact) {
			var res = await _contactService.CreateOrUpdateAsync(contact?.ToContact());

			return new ApiActionResult<Contact>(res);
		}

		[HttpPost]
		[Route("setfavourite")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(ApiResult<bool>))]
		[SwaggerResponse(400, Type = typeof(ApiResult<bool>))]
		public async Task<ApiActionResult<bool>> SetFavourite([FromBody] FavouriteContactModel model) {
			if (model == null) {
				return new ApiActionResult<bool>(UniversalResult<bool>.Fail("No input passed"));
			}

			var res = await _contactService.SetFavouriteAsync(model.Id, model.Favourite);

			return new ApiActionResult<bool>(res);
		}

		[HttpPost]
		[Route("photo")]
		[Consumes("multipart/form-data")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(ApiResult<bool>))]
		[SwaggerResponse(400, Type = typeof(ApiResult<bool>))]
		public async Task<ApiActionResult<bool>> UpdatePictureAsync([FromForm] IFormFile picture,
																	Guid contactId) {
			var res = await _contactService.UpdatePictureAsync(picture, contactId);

			return new ApiActionResult<bool>(res);
		}

		[HttpDelete]
		[Route("delphoto")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[SwaggerResponse(200, Type = typeof(ApiResult<bool>))]
		[SwaggerResponse(400, Type = typeof(ApiResult<bool>))]
		public async Task<ApiActionResult<bool>> DeletePictureAsync(Guid contactId) {
			var res = await _contactService.DeletePictureAsync(contactId);

			return new ApiActionResult<bool>(res);
		}
	}
}