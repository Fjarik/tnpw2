using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;
using DataAccess.Models.API;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess.Models
{
	public class Contact : ContactModel
	{
		public Guid UserId { get; set; }

		public Image Image { get; set; }

		public bool Favourite { get; set; }
	}
}