using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class CompanyAccountsController : Controller
    {
        WPSServiceModel dbUser = new WPSServiceModel();
        Utility utility = new Utility();

        [Decrypted]

        #region Company Accounts
        public ActionResult CompanyAccountsIndex()
        {
            var respComAccounts = dbUser.GetAllComAccounts().ToList();
            return View(respComAccounts);
        }
        [Decrypted]
        public ActionResult CompanyAccounts(int Code)
        {
            ViewBag.CompanyID = new SelectList(dbUser.GetAllCompanies(), "CompanyID", "CompanyName");
            ViewBag.AccountTypeID = new SelectList(dbUser.GetAllActType(), "ID", "Description");
            //ViewBag.City = new SelectList(dbUser.getallCity(), "ID", "Description");
            //ViewBag.State = new SelectList(dbUser.GetAllState(), "ID", "Description");
            ViewBag.ReviewPullType = new SelectList(new List<Object>
            {
                new {value = "1", text = "API"},
                new {value = "2", text = "WEB"},

            }, "value", "text");
            ViewBag.ProfilePullType = new SelectList(new List<Object>
            {
                new {value = "1", text = "ABC"},
                new {value = "2", text = "JKL"},

            }, "value", "text");
            if (Code > 0)
            {               
                var respComAccounts = dbUser.GetAllComAccountsById(Code);
                ViewBag.CompanyID = new SelectList(dbUser.GetAllCompanies(), "CompanyID", "CompanyName", respComAccounts.CompanyID);
                ViewBag.AccountTypeID = new SelectList(dbUser.GetAllActType(), "ID", "Description", respComAccounts.AccountTypeID);
                //ViewBag.City = new SelectList(dbUser.getallCity(), "ID", "Description", respComAccounts.City);
                //ViewBag.State = new SelectList(dbUser.GetAllState(), "ID", "Description", respComAccounts.State);
                ViewBag.ReviewPullType = new SelectList(new List<Object>
                {
                    new {value = "1", text = "API"},
                    new {value = "2", text = "Web"},

                }, "value", "text",respComAccounts.ReviewPullType);
                ViewBag.ProfilePullType = new SelectList(new List<Object>
                {
                    new {value = "1", text = "ABC"},
                    new {value = "2", text = "IJK"},

                }, "value", "text",respComAccounts.ProfilePullType);
                return View(respComAccounts);
            }
            return View();
        }

        [HttpPost]
        [Decrypted]
        public ActionResult CompanyAccounts(int? user, SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                if (comAct.ID > 0)
                {
                    utility.IsSpecifed<SMIM_ReviewAccounts_ST>(comAct);
                    int maxValue = dbUser.UpdateComAccounts(comAct);
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
                    
                    utility.IsSpecifed<SMIM_ReviewAccounts_ST>(comAct);
                    int maxValue = dbUser.InsertComAccounts(comAct);
                    comAct.ID = maxValue;
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
                Log.LogWrite(ex.Message, "Company Accounts Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Decrypted]
        public ActionResult DeleteCompanyAccounts(int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var ComAct = dbUser.GetAllComAccountsById(Code);
                utility.IsSpecifed<SMIM_ReviewAccounts_ST>(ComAct);
                ComAct.Inactive = true;
                int maxValue = dbUser.UpdateComAccounts(ComAct);
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
                Log.LogWrite(ex.Message, "Company Accounts Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }
        #endregion
    }
}