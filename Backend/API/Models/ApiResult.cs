using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Models
{
	public class ApiResult<T>
	{
		[JsonProperty(NullValueHandling = NullValueHandling.Include)]
		public T Content { get; }

		[JsonIgnore]
		internal int StatusCode { get; }

		[JsonProperty(NullValueHandling = NullValueHandling.Include)]
		public List<string> Errors { get; }

		public ApiResult(UniversalResult<T> res) {
			Content = res.Content;
			StatusCode = res.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest;
			Errors = res.Errors;
		}
	}

	public class ApiActionResult<T> : IActionResult
	{
		private ApiResult<T> Result { get; }

		public ApiActionResult(ApiResult<T> result) {
			Result = result;
		}

		public ApiActionResult(UniversalResult<T> res) : this(new ApiResult<T>(res)) { }

		public async Task ExecuteResultAsync(ActionContext context) {
			var res = new ObjectResult(Result) {
				StatusCode = Result.StatusCode,
			};
			await res.ExecuteResultAsync(context);
		}
	}
}