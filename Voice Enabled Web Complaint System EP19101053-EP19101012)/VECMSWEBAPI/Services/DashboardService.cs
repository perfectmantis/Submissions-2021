using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Framework;
namespace WebApiCoreProject.Services
{
    public class DashboardService : BLBase<ComplaintRegistration>, IDashboardService
    {
     


  
        protected override bool IsValidBeforeSave()
        {
            return ErrorList.Count == 0 ? true : false;
        }

        public async Task<DTO> GetAdminDashboardData()
        {
            try
            {
                
                DataSet data = General.ExecuteADOSpE("sp_GetAdminDashboardData");
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> GetUserDashboardData(long UserId)
        {
            try
            {
                string[] str = { "userid" };
                DataSet data = General.ExecuteADOSpE("sp_GetUserDashboardData",str, UserId);
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> GetCompanyUserDashboardData(long UserId)
        {
            try
            {
                string[] str = { "userid" };
                DataSet data = General.ExecuteADOSpE("sp_GetCompanyUserDashboardData", str, UserId);
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> GetCompanyChart()
        {
            try
            {
                string[] str = { "Id" };
                DataTable data = General.ExecuteADOSp("GetChartData", str, 1);
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }
        }
    }
}
