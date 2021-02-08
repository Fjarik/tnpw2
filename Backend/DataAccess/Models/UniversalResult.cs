using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
	public class UniversalResult<T>
	{
		public T Content { get; }
		public bool Success { get; }
		public List<string> Errors { get; } = new();

		private UniversalResult(T content) {
			Content = content;
			Success = true;
		}

		private UniversalResult(IEnumerable<string> errors) {
			Errors = errors.ToList();
			Success = false;
		}

		private UniversalResult(params string[] errors) {
			Errors = errors.ToList();
			Success = false;
		}

		public static UniversalResult<T> Ok(T content) {
			return new(content);
		}

		public static UniversalResult<T> Fail(params string[] errors) {
			return new(errors);
		}

		public static UniversalResult<T> Fail(IEnumerable<string> errors) {
			return new(errors);
		}
	}
}