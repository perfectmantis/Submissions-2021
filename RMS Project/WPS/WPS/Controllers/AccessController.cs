using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.UserServiceClass;

namespace WPS.Controllers
{
    public class AccessController : Controller
    {
        // GET: Access
        UserServiceModel dbUser = new UserServiceModel();

        public ActionResult AssignRoles(int? UserTypeID)
        {
            if (UserTypeID.HasValue && UserTypeID.Value > 0)
            {
                ViewBag.UserType = new SelectList(dbUser.getUserTypes(), "UserTypeID", "Description", UserTypeID.Value);
                var reqAccessRoleToUserType = dbUser.getAccessByUserType(UserTypeID.Value).Select(x => x.RoleId).ToList();
                var roleLst = dbUser.getRoles().Where(x => !reqAccessRoleToUserType.Contains(x.RoleId)).ToList();
                var AssignedroleLst = dbUser.getRoles().Where(x => reqAccessRoleToUserType.Contains(x.RoleId)).ToList();

                if (roleLst != null && roleLst.Count > 0)
                {
                    ViewBag.Roles = new SelectList(roleLst, "RoleId", "RoleName", "Header", roleLst.First());
                }
                else
                    ViewBag.Roles = new SelectList(new List<SelectListItem>() { new SelectListItem { Value = "0", Text = "All Roles Assinged" } }, "value", "text");// new SelectList(temp, "RoleId", "RoleName", "Header", temp.First());

                
                if (AssignedroleLst != null && AssignedroleLst.Count > 0)
                {
                    ViewBag.AssignedRoles = new SelectList(AssignedroleLst, "RoleId", "RoleName", "Header", AssignedroleLst.First());
                }else
                    ViewBag.AssignedRoles = new SelectList(new List<SelectListItem>() { new SelectListItem { Value = "0", Text = "No Assigned Roles" } }, "value", "text");// new SelectList(temp, "RoleId", "RoleName", "Header", temp.First());

            }
            else
            {
                ViewBag.UserType = new SelectList(dbUser.getUserTypes(), "UserTypeID", "Description");
                var temp = dbUser.getRoles();
                ViewBag.Roles = new SelectList(temp, "RoleId", "RoleName", "Header", temp.First());
                ViewBag.AssignedRoles = new SelectList(new List<SelectListItem>() { new SelectListItem { Value = "0", Text = "No Assigned Roles" } }, "value", "text");// new SelectList(temp, "RoleId", "RoleName", "Header", temp.First());
            }
            
            return View();
        }
        public JsonResult GetAssignedRole(int Code)
        {
            var defaultAccess = dbUser.getAccessByUserType(Code);
            var rolesList = dbUser.getRoles().OrderBy(x => x.Header).ThenBy(x => x.FormName).ThenBy(x => x.RoleName).ToList();
            return this.Json(new { Result = (from obj in defaultAccess select new { RoleId = obj.RoleId, Allow = obj.Allow }),
                                    Role = (from obj in rolesList.OrderBy(x => x.Header).ThenBy(x => x.FormName).ThenBy(x => x.RoleName) select new { RoleId = obj.RoleId, RoleName = obj.RoleName, Header = obj.Header, FormName = obj.FormName }) }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AssignRoles(int UserType, string Allow, Guid?[] RoleId, string[] Description, int Count)
        {
            try
            {
                //bool result = false;
                string strMessage = "";

                for (int i = 0; i < Count; i++)
                {
                    SMIM_UserTypeAccess_ST tb_access = new SMIM_UserTypeAccess_ST();
                    if (Allow == "Y")
                    {
                        tb_access.Allow = "Y";
                        tb_access.UserTypeId = UserType;
                        tb_access.UserTypeIdSpecified = true;
                        tb_access.AccessType = "U";
                        tb_access.Description = Description[i];
                        tb_access.RoleId = RoleId[i].ToString();
                        dbUser.InsertUserTypeAccess(tb_access);

                    }
                    else
                    {
                        tb_access = dbUser.getAccessByUserTypeAndRoleId(UserType, RoleId[i].Value).FirstOrDefault();
                        if (tb_access != null)
                        {   
                            dbUser.DeleteUserTypeAccess(tb_access);
                        }
                    }


                }
                strMessage = "Roles succesfully assigned.";

                //result = true;
                return Json(new { success = true, response = strMessage });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }


    }
}