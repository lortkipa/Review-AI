
using Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Service;

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

            // add mapper

            // add repositories

            // add services
            builder.Services.AddScoped<IChatService, ChatService>();

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
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
