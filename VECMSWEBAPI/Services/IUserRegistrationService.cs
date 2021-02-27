using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Models;
using WebApiCore_Base.Framework;
namespace WebApiCoreProject.Services
{
    public interface IUserRegistrationService
    {

        Task<DTO> GetUserRegistationData();
        Task<DTO> GetCompanyUsers();
        Task<DTO> GetUserType();
        Task<DTO> GetUserRegistationDataById(long userid);
        Task<DTO> DeleteUserRegistrationData(long Id);
        Task<DTO> SaveProfile(UserRegistration user);
        Task<DTO> SaveUserRegistration(UserRegistration user);
        Task<DTO> UpdateUserRegistration(long userid,string oldpassword,string newpassword);
    }
}
