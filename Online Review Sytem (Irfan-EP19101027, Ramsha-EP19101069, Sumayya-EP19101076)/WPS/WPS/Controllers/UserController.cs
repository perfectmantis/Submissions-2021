using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.UserServiceClass;
using System.Web.Security;

namespace WPS.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        UserServiceModel dbUser = new UserServiceModel();
        Utility utility = new Utility();
        #region User
        public ActionResult UserIndex()
        {

            var reqUser = dbUser.GetAllUsers();
            reqUser.Select(x => x.SMIM_UserType_ST = dbUser.getUserTypebyId(x.UserTypeId == null ? 0 : x.UserTypeId.Value)).ToList();
            return View(reqUser);
        }

        public ActionResult User(int Code)
        {

            ViewBag.UserTypeId = new SelectList(dbUser.getUserTypes().ToList(), "UserTypeId", "Description");
            ViewBag.AssignedRoles = new MultiSelectList(dbUser.getUserTypes().ToList(), "UserTypeId", "Description");
            ViewBag.Type = new SelectList(new List<Object>
            {
                new {value = "M", text = "Mr"},
                new {value = "R", text = "Mrs"},
                new {value = "I", text = "Miss"},

            }, "value", "text");

            if (Code > 0)
            {
                var reqUser = dbUser.GetUserById(Code);
                ViewBag.UserTypeId = new SelectList(dbUser.getUserTypes().ToList(), "UserTypeId", "Description", reqUser.UserTypeId);
                ViewBag.AssignedRoles = new MultiSelectList(dbUser.getUserTypes().ToList(), "UserTypeId", "Description", reqUser.SMIM_UserAccess_ST.Select(y => y.UserTypeId));
                ViewBag.Type = new SelectList(new List<Object>
            {
               new {value = "M", text = "Mr"},
                new {value = "R", text = "Mrs"},
                new {value = "I", text = "Miss"},

            }, "value", "text", reqUser.Salutation);
                return View(reqUser);


            }
            return View();

        }

        [HttpPost]
        public ActionResult User(SMIM_UserMst_ST User)
        {

            try
            {
                string strMessage = "";
                bool _success = false;
                if (User.UserId > 0)
                {
                    utility.IsSpecifed<SMIM_UserMst_ST>(User);
                    int maxValue = dbUser.UpdateUser(User);
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
                    string password = new Utility().GetUniqueKey(8);
                    //Membership.CreateUser(User.UserName, password);
                    MembershipCreateStatus status;
                    utility.IsSpecifed<SMIM_UserMst_ST>(User);
                    int maxValue = dbUser.InsertUser(User);
                    User.UserId = maxValue;
                    if (maxValue > 0)
                    {
                        MembershipUser newUser = Membership.CreateUser(User.UserName, password, User.UserName, "ok", "ok", true, out status);
                        strMessage = "Record successfully saved. Password for User '" + User.UserName + "' is " + password + "";
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
                Log.LogWrite(ex.Message, "User Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }

        [HttpPost]
        public ActionResult DeleteUser(int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var User = dbUser.GetUserById(Code);
                int maxValue = dbUser.DeleteUser(User);
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
                Log.LogWrite(ex.Message, "User Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }


        }
        #endregion
    }
}