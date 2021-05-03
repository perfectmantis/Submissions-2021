using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Services;

namespace WebApiCoreProject.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DashboardController : BaseController
    {
        
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }
        [HttpGet]
        [ActionName("GetAdminDashboardData")]
        public async Task<IActionResult> GetAdminDashboardData()
        {
            var data = await _dashboardService.GetAdminDashboardData();
            return Ok(data);
        }

        [HttpGet]
        [ActionName("GetUserDashboardData")]
        public async Task<IActionResult> GetUserDashboardData(long UserId)
        {
            var data = await _dashboardService.GetUserDashboardData(UserId);
            return Ok(data);
        }
        [HttpGet]
        [ActionName("GetCompanyChart")]
        public async Task<IActionResult> GetCompanyChart()
        {
            var data = await _dashboardService.GetCompanyChart();
            return Ok(data);
        }

        [HttpGet]
        [ActionName("GetCompanyUserDashboardData")]
        public async Task<IActionResult> GetCompanyUserDashboardData(long UserId)
        {
            var data = await _dashboardService.GetCompanyUserDashboardData(UserId);
            return Ok(data);
        }



    }
}
