using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Policy;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));

			var dbSettings = Configuration.GetSection(nameof(DatabaseSettings)).Get<DatabaseSettings>();

			services.AddSingleton<IDatabaseSettings>(x => x.GetRequiredService<IOptions<DatabaseSettings>>().Value);

			services.AddIdentityMongoDbProvider<User, MongoRole>(x =>
					{
						x.Password.RequireDigit = false;
						x.Password.RequireLowercase = false;
						x.Password.RequireNonAlphanumeric = false;
						x.Password.RequireUppercase = false;
						x.Password.RequiredUniqueChars = 0;
						x.Password.RequiredLength = 3;
					},
					mongo =>
					{
						mongo.ConnectionString = dbSettings.ConnectionString;
						mongo.UsersCollection = dbSettings.UsersCollectionName;
					})
				.AddDefaultTokenProviders()
				.AddUserManager<UserManager<User>>()
				.AddRoleManager<RoleManager<MongoRole>>()
				.AddSignInManager<SignInManager<User>>();

			services.ConfigureApplicationCookie(options =>
			{
				// Cookie settings
				options.Cookie.HttpOnly = true;
				options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

				options.LoginPath = "/Identity/Account/Login";
				options.AccessDeniedPath = "/Identity/Account/AccessDenied";
				options.SlidingExpiration = true;
			});

			services.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
			services.AddSingleton<IAuthorizationHandler, HasClaimHandler>();

			services.AddScoped<IUserService, UserService>();

			services.AddControllers()
				.AddNewtonsoftJson(x => x.UseMemberCasing());

			services.AddSwaggerGen();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseSwagger();

			app.UseSwaggerUI(x => { x.SwaggerEndpoint("/swagger/v1/swagger.json", "Main API v1"); });

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
	}
}