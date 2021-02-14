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
using System.Text;
using System.Threading.Tasks;
using API.Policy;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using AspNetCore.Identity.Mongo.Mongo;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Services;
using DataAccess.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

namespace API
{
	public class Startup
	{
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		private IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			services.Configure<Settings>(Configuration.GetSection(nameof(Settings)));

			var settings = Configuration.GetSection(nameof(Settings)).Get<Settings>();

			services.AddHttpContextAccessor();

			services.AddIdentityMongoDbProvider<User, Role, Guid>(x => {
																	  x.Password.RequireDigit = false;
																	  x.Password.RequireLowercase = false;
																	  x.Password.RequireNonAlphanumeric = false;
																	  x.Password.RequireUppercase = false;
																	  x.Password.RequiredUniqueChars = 0;
																	  x.Password.RequiredLength = 3;
																  },
																  mongo => {
																	  mongo.ConnectionString =
																		  settings.Database.ConnectionString;
																	  mongo.UsersCollection =
																		  settings.Database.UsersCollectionName;
																  })
					.AddDefaultTokenProviders()
					.AddUserManager<UserManager<User>>()
					.AddRoleManager<RoleManager<Role>>()
					.AddSignInManager<SignInManager<User>>();

			var roleCollection =
				MongoUtil.FromConnectionString<Contact>(settings.Database.ConnectionString, "Contacts");
			services.AddSingleton(x => roleCollection);

			services.AddAuthorization()
					.AddAuthentication(x => {
						x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
						x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
						x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
					})
					.AddJwtBearer(x => {
						x.RequireHttpsMetadata = false;
						x.TokenValidationParameters = new TokenValidationParameters {
							ValidIssuer = settings.Jwt.Issuer,
							ValidAudience = settings.Jwt.Issuer,
							IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Jwt.Secret)),
							ClockSkew = TimeSpan.Zero,
						};
					});

			services.ConfigureApplicationCookie(options => {
				// Cookie settings
				options.Cookie.HttpOnly = true;
				options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

				//options.LoginPath = "/Identity/Account/Login";
				//options.AccessDeniedPath = "/Identity/Account/AccessDenied";
				options.SlidingExpiration = true;
			});

			services.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
			services.AddSingleton<IAuthorizationHandler, HasClaimHandler>();

			services.AddScoped<IAuthService, AuthService>();
			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IContactService, ContactService>();

			services.AddControllers()
					.AddNewtonsoftJson(x => x.UseMemberCasing());

			services.AddSwaggerGen(x => {
				x.SwaggerDoc("v1", new OpenApiInfo {
					Title = "Contacts API",
					Version = "v1",
				});
				x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
					Description = "JWT containing UserID claim",
					Name = "Authorization",
					In = ParameterLocation.Header,
					Type = SecuritySchemeType.ApiKey,
				});
				x.AddSecurityRequirement(new OpenApiSecurityRequirement {
					{
						new OpenApiSecurityScheme {
							Reference = new OpenApiReference {
								Id = "Bearer",
								Type = ReferenceType.SecurityScheme
							},
							UnresolvedReference = true
						},
						new List<string>()
					}
				});
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			}

			app.UseSwagger();

			app.UseSwaggerUI(x => { x.SwaggerEndpoint("../swagger/v1/swagger.json", "Main API v1"); });

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}
	}
}