using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;
using System.Web.Security;

namespace WPS.Controllers
{
    public class SaleAccountController : Controller
    {
        // GET: SaleAccount
        WPSServiceModel dbUser = new WPSServiceModel();
        Utility util = new Utility();
        #region SaleAccount
        [Decrypted]
        public ActionResult SaleAccountIndex(int? user, int? OrgId, int? CompanyId)
        {

            var reqSaleAccount = dbUser.GetAllSaleAccount();
            return View(reqSaleAccount);
        }
        [Decrypted]
        public ActionResult SaleAccount(int? user, int? OrgId, int? CompanyId, int Code)
        {

            ViewBag.ParentSaleId = new SelectList(dbUser.GetAllSubAgents().ToList(), "SaleAccId", "SaleAccount");
            ViewBag.AccountType = new SelectList(new List<Object>
            {
                new {value = "A", text = "Agent"},
                new {value = "S", text = "Sub Agent"},


            }, "value", "text");

            if (Code > 0)
            {
                var reqSaleAccount = dbUser.GetAgentById(Code);
                if (reqSaleAccount.ParentSaleId.HasValue)
                {
                    reqSaleAccount.SRCC_SalesAccount_ST2 = dbUser.GetAgentById(reqSaleAccount.ParentSaleId.Value);
                    ViewBag.ParentSaleId = new SelectList(dbUser.GetAllSubAgents().ToList(), "SaleAccId", "SaleAccount", reqSaleAccount.ParentSaleId.Value);
                }
                
                
                ViewBag.AccountType = new SelectList(new List<Object>
                {
                     new {value = "A", text = "Agent"},
                    new {value = "S", text = "Sub Agent"},

                }, "value", "text", reqSaleAccount.AccountType);

                return View(reqSaleAccount);
            }
            return View();

        }

        [HttpPost]
        [Decrypted]
        public ActionResult SaleAccount(int? user, int? OrgId, int? CompanyId, SRCC_SalesAccount_ST SAC)
        {

            try
            {
                string strMessage = "";
                bool _success = true;
                if (SAC.AccountType == "S" && SAC.ParentSaleId == 0)
                {
                    return Json(new { success = false, response = "Please select parent agent." });
                }

                if (SAC.AccountType == "A")
                {
                    SAC.ParentSaleId = null;
                }
                if (SAC.SaleAccId > 0)
                {
                    util.IsSpecifed<SRCC_SalesAccount_ST>(SAC);
                    dbUser.UpdateSalesAccount(SAC);

                    SMSA_Logs_HI log = new SMSA_Logs_HI();
                    util.IsSpecifed<SMSA_Logs_HI>(log);
                    log.ActivityBy = user.Value;
                    log.ActivityDesc = "Edit Agent/SubAgent";
                    log.ActivityOn = DateTime.Now;
                    log.ActivityType = "U";
                    log.ColumnId = SAC.SaleAccId;
                    dbUser.AddActivityLog(log);

                    strMessage = "Record successfully updated.";
                    _success = true;



                }
                else
                {
                    // string password = new Utility().GetUniqueKey(8);
                    // Membership.CreateUser(SaleAccount.UserName, password);

                    SAC.CreatedBy = user;
                    SAC.CreatedOn = DateTime.Now;
                    util.IsSpecifed<SRCC_SalesAccount_ST>(SAC);

                    int maxValue = dbUser.InsertSalesAccount(SAC);
                    SAC.SaleAccId = maxValue;
                    if (maxValue > 0)
                    {
                        SMSA_Logs_HI log = new SMSA_Logs_HI();
                        util.IsSpecifed<SMSA_Logs_HI>(log);
                        log.ActivityBy = user.Value;
                        log.ActivityDesc = "Add New Agent/SubAgent";
                        log.ActivityOn = DateTime.Now;
                        log.ActivityType = "I";
                        log.ColumnId = SAC.SaleAccId;
                        dbUser.AddActivityLog(log);

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
                Log.LogWrite(ex.Message, "Sale Account Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }

        [HttpPost]
        [Decrypted]
        public void DeleteSaleAccount(int? user, int? OrgId, int? CompanyId, int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var SaleAccount = dbUser.GetAgentById(Code);
                dbUser.DeleteSalesAccount(SaleAccount);
                SMSA_Logs_HI log = new SMSA_Logs_HI();
                util.IsSpecifed<SMSA_Logs_HI>(log);
                log.ActivityBy = user.Value;
                log.ActivityDesc = "Delete Agent/SubAgent";
                log.ActivityOn = DateTime.Now;
                log.ActivityType = "D";
                log.ColumnId = Code;
                dbUser.AddActivityLog(log);

                strMessage = "Record successfully deleted.";
                _success = true;


            }

            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Sale Account Delete", ex);

            }


        }
        #endregion
    }
}