
using Dal.Repositories;
using Data;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Service;
using Service.Mapper;
using System.Security.Claims;
using System.Text;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Env.Load();

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular", policy =>
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod());
            });

            // DB connection
            builder.Services.AddDbContext<ProjectContext>(options => {
                options.UseSqlServer(builder.Configuration.GetConnectionString("ReviewAIDBConnection"));
            });

            builder.Services.AddScoped<DbContext, ProjectContext>();

            // add jwt authentication
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["JWTConfig:Key"])),

                   ValidateIssuer = false,
                   ValidateAudience = false,
                   ValidateLifetime = true,

                   // 🔹 Only name identifier (userId) is relevant
                   NameClaimType = ClaimTypes.NameIdentifier,
                   RoleClaimType = ClaimTypes.Role // optional, won't be used
               };

               options.Events = new JwtBearerEvents
               {
                   OnMessageReceived = context =>
                   {
                       // 1️⃣ Check cookie first (optional)
                       if (context.Request.Cookies.ContainsKey("Token"))
                       {
                           context.Token = context.Request.Cookies["Token"];
                       }

                       // 2️⃣ Fallback to Authorization header
                       if (string.IsNullOrEmpty(context.Token) &&
                            context.Request.Headers.ContainsKey("Authorization"))
                       {
                           var authHeader = context.Request.Headers["Authorization"].ToString();
                           if (authHeader.StartsWith("Bearer "))
                           {
                               context.Token = authHeader.Substring("Bearer ".Length).Trim();
                           }
                       }

                       return Task.CompletedTask;
                   }
               };
           });

            // add mapper
            builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile).Assembly);

            // add repositories
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            // add services
            builder.Services.AddScoped<IChatService, ChatService>();
            builder.Services.AddScoped<IUserService, UserService>();

            // add swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddControllers();

            var app = builder.Build();

            app.UseCors("AllowAngular"); // AllowAll

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
