using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCoreProject.Services;
using WebApiCore_Base.Models;

namespace WebApiCoreProject.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpGet]
        [ActionName("GetUserVerification")]
        public async Task<IActionResult> GetUserVerification(string UserName, string Password)
        {
            var data = await this._loginService.GetUserVerification(UserName, Password);
            return Ok(data);

        }

        [HttpGet]
        [ActionName("GetScreens")]
        public async Task<IActionResult> GetScreens(int UserTypeId)
        {
            var data = await this._loginService.GetScreens(UserTypeId);
            return Ok(data);

        }

    }
}