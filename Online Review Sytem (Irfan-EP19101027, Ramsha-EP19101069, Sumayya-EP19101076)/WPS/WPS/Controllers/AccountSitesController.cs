using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class AccountSitesController : Controller
    {
        // GET: AccountSites
        WPSServiceModel dbUser = new WPSServiceModel();
        Utility utility = new Utility();

        #region Review Account Sites
        [HttpGet]
        [Decrypted]
        public ActionResult ReviewAccountSite(int? user, int? OrgId, int? CompanyId, int? Code)
        {
            var respReviewActSites = new ReviewCollection();
            if (Code.HasValue && Code.Value > 0)
            {
                respReviewActSites = dbUser.GetAllReviewActSiteById(Code.Value);               
            }
            return View(respReviewActSites);
        }

        [HttpPost]
        [Decrypted]
        public ActionResult ReviewAccountSite(int? user, int accountID, int reviewSiteID, string reviewURL, bool? isActive)
        {
            try
            {
                string strMessage = ""; bool _success = false;
                //SMIM_ReviewAccountSite_ST Reviewact = new SMIM_ReviewAccountSite_ST();
                var Reviewact = new SMIM_ReviewAccountSite_ST();
                var respReview = dbUser.GetAllReviewActSiteById(accountID);
                var respActsiteid = respReview.ReviewActsites.Where(x => x.ReviewSiteID == reviewSiteID).FirstOrDefault(); // Select(x => x.AccountSiteID).FirstOrDefault(); 

                    if (respActsiteid != null && respActsiteid.AccountSiteID > 0)
                    {
                        utility.IsSpecifed<SMIM_ReviewAccountSite_ST>(Reviewact);
                        Reviewact.AccountSiteID = respActsiteid.AccountSiteID; //Convert.ToInt32(respActsiteid);
                        Reviewact.AccountID = accountID;
                        Reviewact.ReviewSiteID = reviewSiteID;
                        Reviewact.ReviewURL = reviewURL;
                        Reviewact.IsActive = isActive;
                        int maxValue = dbUser.UpdateReviewAct(Reviewact);
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
                        utility.IsSpecifed<SMIM_ReviewAccountSite_ST>(Reviewact);
                        Reviewact.AccountID = accountID;
                        Reviewact.ReviewSiteID = reviewSiteID;
                        Reviewact.ReviewURL = reviewURL;
                        Reviewact.IsActive = isActive;
                        int maxValue = dbUser.InsertReviewAct(Reviewact);
                        Reviewact.AccountSiteID = maxValue;
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

                //return Json(new { success = _success, response = strMessage });
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Review Account Sites Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Decrypted]
        public ActionResult DeleteReviewAccountSite(int? user, int accountID, int? reviewSiteID, string reviewURL, bool isActive)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                SMIM_ReviewAccountSite_ST Reviewact = new SMIM_ReviewAccountSite_ST();
                utility.IsSpecifed<SMIM_ReviewAccountSite_ST>(Reviewact);
                var respReview = dbUser.GetAllReviewActSiteById(accountID);
                var respActsiteid = respReview.ReviewActsites.Where(x => x.ReviewSiteID == reviewSiteID).FirstOrDefault();
                Reviewact.AccountSiteID = respActsiteid.AccountSiteID;
                Reviewact.AccountID = respActsiteid.AccountID;
                Reviewact.ReviewSiteID = respActsiteid.ReviewSiteID;
                Reviewact.ReviewURL = respActsiteid.ReviewURL;
                Reviewact.IsActive = respActsiteid.IsActive;

                int maxValue = dbUser.DeleteReviewAct(Reviewact);
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
                Log.LogWrite(ex.Message, "Review Account Sites Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }
        #endregion
    }
}