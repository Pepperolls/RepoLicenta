using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using System;
using WebApplication.Repositories;
using WebApplication.Services.EmailService;
using WebApplication.Services.EmailService.Interfaces;
using WebApplication.Services.EmailService.Models;

namespace WebApplication
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public string dbConnectionString { get; set; } 

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            dbConnectionString = configuration.GetConnectionString("CarLoungeDb");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(builder =>
            //                      {
            //                          builder.WithOrigins("http://localhost:3000")
            //                          .AllowAnyHeader()
            //                          .AllowAnyMethod();
            //                      });
            //});

            services.AddControllers().AddNewtonsoftJson(options 
                => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApplication", Version = "v1" });
            });

            services.AddDbContext<AutoPartsContext>(options => options.UseSqlServer(dbConnectionString));

            services.AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IPartRepository, PartRepository>()
                .AddScoped<ICarRepository, CarRepository>()
                .AddScoped<IOrderRepository, OrderRepository>();


            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            services.AddTransient<IAPIMailService, APIMailService>();
            services.AddHttpClient("MailTrapApiClient", (services, client) =>
            {
                var mailSettings = services.GetRequiredService<IOptions<MailSettings>>().Value;
                client.BaseAddress = new Uri(mailSettings.ApiBaseUrl); 
                client.DefaultRequestHeaders.Add("Api-Token", mailSettings.ApiToken);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApplication v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
