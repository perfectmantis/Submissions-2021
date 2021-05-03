using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Models;
using WebApiCore_Base.Framework;
namespace WebApiCoreProject.Services
{
    public interface ILoginService
    {
        Task<DTO> GetUserVerification(string UserName, string Password);
        Task<DTO> GetScreens(int UserTypeId);
    }
}
