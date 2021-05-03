using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Services;

namespace WebApiCoreProject
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

            //Allow Reference Looping
            services.AddControllers()
            .AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            //Allow Cors.......................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
            services.AddCors(c =>
              {
                  c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader()
                                                      .AllowAnyMethod());
              });
            //End
            //Need to created instance of all services
            services.AddDbContext<ComplaintManagementSystemContext>();
            services.AddScoped<IStateService, Services.StateService>();
            services.AddScoped<ICategoryService, Services.CategoryService>();
            services.AddScoped<ISubCategoryService, Services.SubCategoryService>();
            services.AddScoped<IUserRegistrationService, Services.UserRegistrationService>();
            services.AddScoped<ILoginService, Services.LoginService>();
            services.AddScoped<IRegisterComplaintService, Services.RegisterComplaintService>();
            services.AddScoped<IDashboardService, Services.DashboardService>();
            //End

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseHttpsRedirection();

            app.UseRouting();


            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "Documents")),
                RequestPath = "/Documents"
            });
            //Enable directory browsing
            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                            Path.Combine(Directory.GetCurrentDirectory(), "Documents")),
                RequestPath = "/Documents"
            });
            app.UseAuthorization();

            //app.MapHttpAttributeRoutes();
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            Connection.ConnectionString = @"Server= DESKTOP-FMAB3GA\SQLEXPRESS; Database=ComplaintManagementSystem;Trusted_Connection=True;";
           
          //  Connection.ConnectionString = "Server=DESKTOP-5R46NI3; Database=ComplaintManagementSystem;Trusted_Connection=True;";
                //"Server=206.72.194.138; Database=ComplaintDB;User Id =complaint123; Password=C8l63vt_;";
            //Connection.ConnectionString = "Server=SQL5034.site4now.net; Initial Catalog = DB_A44C7A_complaint;User Id =DB_A44C7A_complaint_admin; Password=Opacity900;";
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

            });
        }
    }
}
