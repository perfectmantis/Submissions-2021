using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.UserServiceClass;

namespace WPS.Controllers
{
    public class SetupController : Controller
    {
        // GET: Setup
        UserServiceModel dbUser = new UserServiceModel();
        #region User Type
        public ActionResult UserTypeIndex()
        {
            var reqUserType = dbUser.getUserTypes();
            return View(reqUserType);
        }

        public ActionResult UserType(int? Code)
        {
            if (Code.HasValue && Code > 0)
            {
                return View(dbUser.getUserTypebyId(Code.Value));
            }
            return View();

        }

        [HttpPost]
        public ActionResult UserType(SMIM_UserType_ST userType)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                if (userType.UserTypeId > 0)
                {
                    int maxValue = dbUser.UpdateUserType(userType);
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully updated.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                else
                {
                    int maxValue = dbUser.InsertUserType(userType);
                    userType.UserTypeId = maxValue;
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully saved.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "User Type Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }
        }

        [HttpPost]
        public ActionResult DeleteUserType(int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var userType = dbUser.getUserTypebyId(Code);
                int maxValue = dbUser.DeleteUserType(userType);
                if (maxValue > 0)
                {
                    strMessage = "Record successfully updated.";
                    _success = true;
                }
                else
                {
                    strMessage = "Application server error.";
                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "User Type Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }


        }
        #endregion

        #region Roles
        public ActionResult RolesIndex()
        {
            var reqRoles = dbUser.getRoles();
            return View(reqRoles);
        }

        public ActionResult Roles(Guid? Code)
        {
            if (Code != null && Code.ToString() != "{00000000-0000-0000-0000-000000000000}")
            {
                return View(dbUser.getRolesbyId(Code.Value));
            }
            return View();

        }

        [HttpPost]
        public ActionResult Roles(SMSA_Roles_ST Roles)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                if (Roles.RoleId == null || Roles.RoleId.ToString() == "{00000000-0000-0000-0000-000000000000}")
                {

                    if (System.Web.Security.Roles.RoleExists(Roles.RoleName))
                    {
                        strMessage = "Role already exists";
                        return Json(new { success = false, response = strMessage });
                    }

                    System.Web.Security.Roles.CreateRole(Roles.RoleName);
                    int maxValue = dbUser.InsertRoles(Roles);
                    Roles.RoleId = maxValue.ToString();
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully saved.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }


                }
                else
                {
                    int maxValue = dbUser.UpdateRoles(Roles);
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully updated.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Roles Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }
        }

        [HttpPost]
        public ActionResult DeleteRoles(Guid Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var Roles = dbUser.getRolesbyId(Code);
                int maxValue = dbUser.DeleteRoles(Roles);
                if (maxValue > 0)
                {
                    strMessage = "Record successfully updated.";
                    _success = true;
                }
                else
                {
                    strMessage = "Application server error.";
                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Roles Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }


        }
        #endregion

        #region Menu
        public ActionResult MenuIndex()
        {
            var reqMenuList = dbUser.getMenuList();
            return View(reqMenuList);
        }
        public ActionResult Menu(int? Code)
        {
            ViewBag.ParentMenuId = new SelectList(dbUser.getParentMenuList(), "MenuID", "MenuDescription");
            ViewBag.MenuType = new SelectList(new List<Object>
            {
                new {value = "P", text = "Parent"},
                new {value = "C", text = "Child"},

            }, "value", "text");

            if (Code.HasValue && Code > 0)
            {
                var reqMenu = dbUser.getMenubyId(Code.Value);
                ViewBag.ParentMenuId = new SelectList(dbUser.getParentMenuList(), "MenuID", "MenuDescription", reqMenu.ParentMenuId);
                ViewBag.MenuType = new SelectList(new List<Object>
            {
                new {value = "P", text = "Parent"},
                new {value = "C", text = "Child"},

            }, "value", "text", reqMenu.MenuType);
                return View(reqMenu);
            }
            return View();

        }

        [HttpPost]
        public ActionResult Menu(SMAM_Menu_ST Menu)
        {

            try
            {
                string strMessage = "";
                bool _success = false;
                if (Menu.MenuId > 0)
                {
                    Menu.MenuIdSpecified = true;
                    Menu.ParentMenuIdSpecified = true;
                    Menu.MenuSeqSpecified = true;
                    int maxValue = dbUser.UpdateMenu(Menu);
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully updated.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                else
                {
                    Menu.ParentMenuIdSpecified = true;
                    Menu.MenuSeqSpecified = true;
                    int maxValue = dbUser.InsertMenu(Menu);
                    Menu.MenuId = maxValue;
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully saved.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Menu Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }

        [HttpPost]
        public ActionResult DeleteMenu(int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var Menu = dbUser.getMenubyId(Code);
                int maxValue = dbUser.DeleteMenu(Menu);
                if (maxValue > 0)
                {
                    strMessage = "Record successfully deleted.";
                    _success = true;
                }
                else
                {
                    strMessage = "Application server error.";
                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Menu Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }


        }

        #endregion
    }
}