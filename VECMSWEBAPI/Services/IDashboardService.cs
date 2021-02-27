using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;

namespace WebApiCoreProject.Services
{
    public interface IDashboardService
    {
        Task<DTO> GetAdminDashboardData();
        Task<DTO> GetCompanyChart();
        Task<DTO> GetUserDashboardData(long UserId);
        Task<DTO> GetCompanyUserDashboardData(long UserId);
    }
}
