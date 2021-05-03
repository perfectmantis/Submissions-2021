using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Services;

namespace WebApiCoreProject.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserRegistrationController : BaseController
    {
        private readonly IUserRegistrationService _userregistrationService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserRegistrationController(IUserRegistrationService userregistrationService, IHostingEnvironment hostingEnvironment)
        {
            _userregistrationService = userregistrationService;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        [ActionName("GetUserRegistationData")]
        public async Task<IActionResult> GetUserRegistationData()
        {
            var data = await _userregistrationService.GetUserRegistationData();
            return Ok(data);
        }

        [HttpGet]
        [ActionName("GetCompanyUsers")]
        public async Task<IActionResult> GetCompanyUsers()
        {
            var data = await _userregistrationService.GetCompanyUsers();
            return Ok(data);
        }

        [HttpGet]
        [ActionName("GetUserType")]
        public async Task<IActionResult> GetUserType()
        {
            var data = await _userregistrationService.GetUserType();
            return Ok(data);
        }


        [HttpGet]
        [ActionName("GetUserRegistationDataById")]
        public async Task<IActionResult> GetUserRegistationDataById(long UserId)
        {
            var data = await _userregistrationService.GetUserRegistationDataById(UserId);
            return Ok(data);
        }

        [ActionName("SubmitProfile")]
        [HttpPost]
        public async Task<IActionResult> SubmitProfile()
        {

            try
            {
                var httprequest = HttpContext.Request.Form;
                var obj = httprequest["obj"];
                UserRegistration usereg = new UserRegistration();
                string fileName = null;
                var postedfile = httprequest.Files["file"];
                usereg.AddBy = httprequest["addBy"].ToInt();
                usereg.ContactNo = httprequest["contactNo"].ToStr();
                usereg.Email = httprequest["email"].ToStr();
                usereg.FullName = httprequest["fullName"].ToStr();
                usereg.Password = httprequest["password"].ToStr();
                usereg.Address = httprequest["address"].ToStr();
                usereg.StateId = httprequest["stateId"].ToInt();
                usereg.CompanyName = httprequest["companyName"].ToStr();
                usereg.Id = httprequest["id"].ToInt();
                usereg.PinCode = httprequest["pinCode"].ToStr();

                // Create Custom File Name
                string filePath = string.Empty;
                if (postedfile != null)
                {
                    fileName = new String(Path.GetFileNameWithoutExtension(postedfile.FileName).Take(10).ToArray()).Replace(" ", "-");
                    fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedfile.FileName);
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    var contentRootPath = _hostingEnvironment.ContentRootPath;
                    //var fileName = Path.GetFileName(postedfile.FileName);
                    filePath = contentRootPath + "\\Documents\\" + fileName;

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await postedfile.CopyToAsync(stream);
                    }
                }
                usereg.ImageName = fileName;
                usereg.ImagePath = filePath;
                var data = await _userregistrationService.SaveProfile(usereg);

                return Ok(data);
            }

            catch (Exception Ex)
            {

                throw Ex;
            }

        }
        [ActionName("UpdateUserRegistration")]
        [HttpGet]
        public async Task<IActionResult> UpdateUserRegistration(long UserId, string OldPassword, string Password)
        {
            var data = await _userregistrationService.UpdateUserRegistration(UserId, OldPassword, Password);

            return Ok(data);

        }


        [ActionName("SubmitUserRegistration")]
        [HttpPost]
        public async Task<IActionResult> SubmitUserRegistration(UserRegistration obj)
        {
            var data = await _userregistrationService.SaveUserRegistration(obj);

            return Ok(data);

        }
        [HttpGet]
        [ActionName("DeleteUserRegistrationData")]
        public async Task<IActionResult> DeleteUserRegistrationData(long Id)
        {
            var data = await _userregistrationService.DeleteUserRegistrationData(Id);
            return Ok(data);
        }
    }
}
