using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WPS.Models;
using WPS.UserServiceClass;

namespace WPS.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        UserServiceModel dbUser = new UserServiceModel();
        public ActionResult Login()
        {
            Utility utility = new Utility();
            UserServiceModel dbUser = new UserServiceModel();
            if (Membership.GetUser("admin") == null)
            {
                MembershipCreateStatus status;
                // Generate a new 12-character password with 1 non-alphanumeric character.
                //y0t(9ci&xUn^
                string password = utility.GetUniqueKey(8);//Membership.GeneratePassword(8, 0);
                                                          // string password = "123456";

                SMIM_UserMst_ST userentity = new SMIM_UserMst_ST();

               
                userentity.UserName = "admin";
                userentity.UserTypeId = 1;//db.HRMS_UserType_ST.Where(x => x.Description == "Admin").Select(x => x.UserTypeId).FirstOrDefault();
                userentity.FirstName = "admin";
                userentity.LastName = "admin";
                userentity.Email = "irfanrafiq90@gmail.com";
                userentity.CreateOn = System.DateTime.Now;
                userentity.CreatedBy = 0;
                dbUser.InsertUser(userentity);
                MembershipUser newUser = Membership.CreateUser("admin", password, "admin", "ok", "ok", true, out status);
                utility.sendMail("irfanrafiq90@gmail.com", "Admin Credential", "Admin User created successfully<br/> Password is " + password);


            }
            return View();
        }

        [Decrypted]
        public ActionResult ChangePassword(int? user)
        {
            if (Request.UrlReferrer == null || Request.UrlReferrer.Segments[Request.UrlReferrer.Segments.Length - 1] == "")
                return RedirectToAction("Login", "Login");

            return View();
        }

        public ActionResult ForgotPassword(int? user)
        {
            if (Request.UrlReferrer == null || Request.UrlReferrer.Segments[Request.UrlReferrer.Segments.Length - 1] == "")
                return RedirectToAction("Login", "Login");

            return View();
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            Session.Clear();
            Session["url"] = null;

            Session["timer"] = null;

            return RedirectToAction("Login", "Login");
        }

        [HttpPost]
        public ActionResult Verification(Login tt)
        {
            if (Request.UrlReferrer == null || Request.UrlReferrer.Segments[Request.UrlReferrer.Segments.Length - 1] == "")
                return RedirectToAction("Login", "Login");

            try
            {
                MvcHtmlString urlEncrypt;
                string dashboard = "";
                string sUserName = tt.id, sPassword = tt.password;

                if (!Membership.ValidateUser(sUserName, sPassword))
                {
                    return Json(new { success = false, response = "Invalid User & Password." });
                }
                else
                {
                    FormsAuthentication.SetAuthCookie(sUserName, true);

                    Session["UserInfo"] = sUserName;

                    var respUserDetail = dbUser.GetUserByUserName(sUserName);// db.HRMS_UserMst_ST.Include(c => c.HRMS_UserType_ST).Where(a => a.UserName == sUserName).FirstOrDefault();
                    var respUserTypeDetail = dbUser.getUserTypebyId(respUserDetail.UserTypeId.Value);// db.HRMS_UserType_ST.Where(x => x.UserTypeId == respUserDetail.UserTypeId).FirstOrDefault();

                    if (respUserTypeDetail.Type == "A")
                    {
                        if (respUserDetail.LoginDate == null)
                        {
                            urlEncrypt = Encrypted.EncodedAction(null, "ChangePassword", "Login", new { user = respUserDetail.UserId.ToString(), OrgId = respUserDetail.OrgId == null ? 0 : respUserDetail.OrgId, CompanyId = respUserDetail.CompanyId == null ? 0 : respUserDetail.CompanyId }, null);
                            dashboard = urlEncrypt.ToString();
                        }
                        else
                        {
                            urlEncrypt = Encrypted.EncodedAction(null, "AdminDashboard", "Home", new { user = respUserDetail.UserId.ToString(), OrgId = 0, CompanyId = 0 }, null);
                            dashboard = urlEncrypt.ToString();

                            Session["url"] = dashboard;
                        }
                    }

                    else
                    {
                        if (respUserDetail.LoginDate == null)
                        {
                            urlEncrypt = Encrypted.EncodedAction(null, "ChangePassword", "Login", new { user = respUserDetail.UserId.ToString(), OrgId = respUserDetail.OrgId == null ? 0 : respUserDetail.OrgId, CompanyId = respUserDetail.CompanyId == null ? 0 : respUserDetail.CompanyId }, null);
                            dashboard = urlEncrypt.ToString();
                        }
                        else
                        {
                            urlEncrypt = Encrypted.EncodedAction(null, "AdminDashboard", "Home", new { user = respUserDetail.UserId.ToString(), OrgId = respUserDetail.OrgId == null ? 0 : respUserDetail.OrgId, CompanyId = respUserDetail.CompanyId == null ? 0 : respUserDetail.CompanyId }, null);
                            dashboard = urlEncrypt.ToString();

                            Session["url"] = dashboard;
                        }
                    }

                }
                return Json(new { success = true, response = dashboard });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, response = ex.Message });
            }

        }

        [HttpPost]
        [Decrypted]
        public ActionResult ChangePassword(int? user, int? OrgId, int? CompanyId, ChangePassword tt)
        {
            MembershipUser mu = Membership.GetUser(Session["UserInfo"].ToString());
            string pass = mu.GetPassword("ok");
            string myUrl = "/Login";

            if (tt.Newpassword.Length < 6)
            {
                return Json(new { success = false, response = "Password must be minimum 6 characters." });
            }

            if (pass == tt.Oldpassword)
            {
                if (mu.ChangePassword(pass, tt.Newpassword))
                {
                    var reqLogin = dbUser.GetUserById(user.Value);//db.HRMS_UserMst_ST.Include(c => c.HRMS_UserType_ST).Where(x => x.UserId == user).FirstOrDefault();
                    if (reqLogin.LoginDate == null)
                    {
                        reqLogin.LoginDate = DateTime.Now;
                        dbUser.UpdateUser(reqLogin);
                    }

                    return Json(new { success = true, response = myUrl });
                }
                return Json(new { success = false, response = "Password change failed. Please contact your administrator." });
            }

            return Json(new { success = false, response = "Old password is incorrect." });


        }

        [HttpPost]
        public ActionResult ForgotPassword(ForgotPassword tt)
        {
            try
            {
                if (Request.UrlReferrer == null || Request.UrlReferrer.Segments[Request.UrlReferrer.Segments.Length - 1] == "")
                    return RedirectToAction("Login", "Login");

                string body = string.Empty;
                string Username = "";
                string Password = "";

                MembershipUser mu = Membership.GetUser(tt.UserName);

                //GetIPAddress();
                if (mu != null)
                {
                    if (mu.UserName != null || mu.UserName != string.Empty)
                    {
                        Password = mu.GetPassword("ok");
                        Username = tt.UserName;

                        //using (StreamReader reader = new StreamReader(Server.MapPath("~/EmailFormat/ForgotPassword.html")))
                        //{
                        //    body = reader.ReadToEnd();

                        //}
                        //string Email = dbUser.GetUserByUserName(tt.UserName).Email;//db.HRMS_UserMst_ST.Where(x => x.UserName == tt.Username).Select(x => x.Email).FirstOrDefault();

                        //body = body.Replace("{Username}", tt.UserName);
                        //body = body.Replace("{Password}", Password);

                        //utility.sendMail(Email, "Forgot Password", body);

                        string strMessage = "Password has been successfully. Password is " + Password + "";

                        return Json(new { success = true, response = strMessage });
                    }
                    else
                    {
                        return Json(new { success = false, response = "Username is invalid." });
                    }
                }
                else
                {
                    return Json(new { success = false, response = "Username is invalid." });
                }

            }
            catch (Exception ex)
            {
                Log.LogWrite("Forgot Password Faild : " + ex.Message, "Forgot Password Failed", ex);
                return Json(new { success = false, response = "Forgot password failed. Please contact your administrator." });
                throw;
            }

        }
    }
}