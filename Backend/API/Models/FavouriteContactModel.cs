using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
	public class FavouriteContactModel
	{
		[Required]
		public Guid Id { get; set; }

		[Required]
		public bool Favourite { get; set; }
	}
}