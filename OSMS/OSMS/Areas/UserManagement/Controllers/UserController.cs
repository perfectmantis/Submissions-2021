using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using OSMS.Models;
using OSMS.Areas.UserManagement.Models;

namespace OSMS.Areas.UserManagement.Controllers
{
    
    public class UserController : Controller
    {
        callAPI CallAPI = new callAPI();
        // GET: UserManagement/User
        public ActionResult User(int? UserId)
        {
            string url = "api/UserManagement/User/GetUserById?UserId=";
            var User = CallAPI.GetEntityById<UserModelClass>(url, /*UserId*/(1).ToString());
            return View("User", User);            
        }

        public ActionResult Update(UserModelClass modelClass)
        {
            string url = "api/UserManagement/User/Update";
            var User = CallAPI.InsertUpdateEntity2<UserModelClass>(url, modelClass);
            return View("User", User);
        }

        public ActionResult ChangePassword()
        {
            
            return View("ChangePassword");
        }

        public string SavePassword(int UserId, string OldPassword, string NewPassword)
        {
            string url = "api/UserManagement/User/UpdatePassword?UserId=";
            var User = CallAPI.UpdateEntity<UserModelClass>(url, UserId, "OldPassword=", OldPassword, "NewPassword=", NewPassword);
            return User;            
        }

        [System.Web.Http.HttpPost]
        public ActionResult Insert(UserModelClass modelClass)
        {
            string url = "api/UserManagement/User/Insert";
            var User = CallAPI.InsertUpdateEntity2<UserModelClass>(url, modelClass);
            string _url = Url.Action("Login", "User");
            return Json( new { data = User }, JsonRequestBehavior.AllowGet );//View("Register");
        }
        public ActionResult Register()
        {            
            return View("Register");
        }

        public ActionResult Login()
        {
            return View("Login");
        }

        [System.Web.Http.HttpPost]
        public ActionResult Checkuser(UserModelClass modelClass)
        {
            string url = "api/UserManagement/User/Checkuser";
            var loginUser = CallAPI.InsertUpdateEntity<UserModelClass>(url, modelClass);
            
            if (loginUser > 0)
            {
                OSMS.Models.GenricClass.UserName = modelClass.Name;
                
            }
            //else
            //{
            //    return View("Login", loginUser);
            //}
            return Json(new { data = loginUser }, JsonRequestBehavior.AllowGet);//View("Register");
        }

    }
}