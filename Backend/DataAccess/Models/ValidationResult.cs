using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
	public class ValidationResult
	{
		public bool IsSuccess { get; set; }
		public Exception Exception { get; set; }

		public ValidationResult(Exception exception) {
			IsSuccess = false;
			Exception = exception;
		}

		public ValidationResult() {
			IsSuccess = true;
			Exception = null;
		}
	}
}