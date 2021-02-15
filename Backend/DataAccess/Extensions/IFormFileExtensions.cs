using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DataAccess.Extensions
{
	public static class IFormFileExtensions
	{
		public static bool IsPicture(this IFormFile file) {
			return IsPicture(file?.ContentType);
		}

		public static async Task<byte[]> GetBytesAsync(this IFormFile formFile) {
			await using var memoryStream = new MemoryStream();
			await formFile.CopyToAsync(memoryStream);
			return memoryStream.ToArray();
		}

		private static bool IsPicture(string mimeType) {
			if (!mimeType.StartsWith("image/")) {
				return false;
			}
			mimeType = mimeType[6..];
			switch (mimeType) {
				case "jpeg":
				case "png":
					return true;
			}
			return false;
		}
	}
}