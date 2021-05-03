using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.UserServiceClass;

namespace WPS.Controllers
{
    public class CommonController : Controller
    {
        // GET: Common
        UserServiceModel dbUser = new UserServiceModel();
        WPSServiceModel dbWPS = new WPSServiceModel();
        public ActionResult _Menu()
        {
            string urlParams = WPS.decryptURL.decryptURLstring(Request.QueryString["q"].ToString());
            string[] arrQryStr = urlParams.Split('?');

            int User = Convert.ToInt16(arrQryStr[0].Split('=')[1].ToString());
            int OrgId = arrQryStr[1].Split('=')[1].ToString() == "" ? 0 : Convert.ToInt16(arrQryStr[1].Split('=')[1].ToString());
            int CompanyId = arrQryStr[2].Split('=')[1].ToString() == "" ? 0 : Convert.ToInt16(arrQryStr[2].Split('=')[1].ToString());

            int[] UserAccessTypeIds = new int[1];
            UserAccessTypeIds[0] = dbUser.GetUserById(User).UserTypeId.Value;//dbUser.getUserAccessByUserID(User).Select(x => x.UserTypeId).ToList();//  

            var UserAccess = dbUser.getAccessByUserTypeByAssignedUserTypes(UserAccessTypeIds.ToArray());// db.HRMS_Access_ST.Where(x => UserAccessTypeIds.Contains(x.HRMS_UserType_ST.UserTypeId)).Select(x => x.aspnet_Roles.RoleName).ToList();
            var roles = UserAccess.Select(x => x.RoleId.ToString()).ToList();
            var roleName = dbUser.getRolesbyRoleId(roles.ToArray()).Select(x => x.RoleName).ToList();
            var Menu = dbUser.getMenuList();
            Menu = Menu.Where(x => roleName.Contains(x.RoleName)).ToList();
            //Menu = Menu.ToList();

            return View(Menu);
        }

        public ActionResult _MobileMenu()
        {
            //string urlParams = PMS.decryptURL.decryptURLstring(Request.QueryString["q"].ToString());
            //string[] arrQryStr = urlParams.Split('?');

            //int User = Convert.ToInt16(arrQryStr[0].Split('=')[1].ToString());
            //int exchangeID = arrQryStr[1].Split('=')[1].ToString() == "" ? 0 : Convert.ToInt16(arrQryStr[1].Split('=')[1].ToString());

            //var UserAccessTypeIds = db.HRMS_UserAccess_ST.Where(x => x.UserId == User).Select(x => x.UserTypeId).ToList();

            //var UserAccess = db.HRMS_Access_ST.Where(x => UserAccessTypeIds.Contains(x.HRMS_UserType_ST.UserTypeId)).Select(x => x.aspnet_Roles.RoleName).ToList();

            //var Menu = db.SMAM_Menu_ST.ToList();
            //tempMenu viewModel = new tempMenu
            //{
            //    // Here you do a database call to populate your menu items
            //    // This GetAllMenuItems method returns a list of MenuItem objects
            //    MenuItems = from m in Menu
            //                where UserAccess.Contains(m.RoleName)
            //                select m

            //                //MenuItems = db.SMAM_Menu_ST.ToList()
            //};
            return View(dbUser.getMenuList().ToList());
        }

        public ActionResult CommonFilter(int? user, int? OrgId, int? CompanyId)
        {
            ViewBag.OrgID = new SelectList(dbWPS.GetAllOrganization(), "OrgID", "Description");
            if (OrgId == null)
            {
                OrgId = 0;
                ViewBag.CompanyID = new SelectList(dbWPS.GetAllCompaniesByOrgId(OrgId.Value), "CompanyID", "CompanyName");
            }
            
            ViewBag.SiteID = new SelectList(dbWPS.GetAllReviewSites(), "SiteID", "SiteName");
            ViewBag.AccountType = new SelectList(dbWPS.GetAllActType(), "ID", "Description");
            ViewBag.AccountID = new SelectList(dbWPS.GetAllAccountsName(), "AccountID", "AccountName");
            ViewBag.BenchmarkID = new SelectList(dbWPS.GetBenchAccountsName(), "BenchmarkID", "AccountName");

            return View();
        }

        [HttpPost]
        public JsonResult FillSubAgent(int AgentId)
        {
            try
            {

                var respSubAgents = dbWPS.GetAllSubAgentByAgentId(AgentId).Select(u => new SelectListItem { Value = u.SaleAccId.ToString(), Text = u.SaleAccount });

                return Json(new { SubAgent = respSubAgents }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Get sub companies is failed. {0}", ex.Message));
                throw e;
            }
        }

        [HttpPost]
        public JsonResult FillOrganization(int AgentId, int SubAgentId)
        {
            try
            {
                if (SubAgentId > 0)
                {
                    var respSubAgents = dbWPS.GetAllOrganizationBySaleAgentId(SubAgentId).Select(u => new SelectListItem { Value = u.OrgID.ToString(), Text = u.Description });
                    return Json(new { Organization = respSubAgents }, JsonRequestBehavior.AllowGet);
                }
                else if (AgentId > 0)
                {
                    var respSubAgents = dbWPS.GetAllOrganizationBySaleAgentId(AgentId).Select(u => new SelectListItem { Value = u.OrgID.ToString(), Text = u.Description });
                    return Json(new { Organization = respSubAgents }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var respSubAgents = dbWPS.GetAllOrganizationByType("G").Select(u => new SelectListItem { Value = u.OrgID.ToString(), Text = u.Description });
                    return Json(new { Organization = respSubAgents }, JsonRequestBehavior.AllowGet);
                }

                
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Get sub companies is failed. {0}", ex.Message));
                throw e;
            }
        }

        [HttpPost]
        public JsonResult FillCompany(int AgentId)
        {
            try
            {

                var respCompanys = dbWPS.GetAllCompanies().Where(x => x.SaleAccId == AgentId ).Select(u => new SelectListItem { Value = u.CompanyID.ToString(), Text = u.CompanyName }).ToList();

                return Json(new { Company = respCompanys }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Get companies is failed. {0}", ex.Message));
                throw e;
            }
        }
        

       
    }
}