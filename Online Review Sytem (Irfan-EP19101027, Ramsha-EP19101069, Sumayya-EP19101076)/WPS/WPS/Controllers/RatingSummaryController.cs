using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class RatingSummaryController : Controller
    {
        // GET: RatingSummary     
        WPSServiceModel wpsModel = new WPSServiceModel();
        Utility utility = new Utility();

        #region Ratings Summary
        [Decrypted]
        public ActionResult RatingSummary()
        {
            ViewBag.AccountID = new SelectList(wpsModel.GetAllAccountsName(), "AccountID", "AccountName");
            RatingSummary ratingTr = new RatingSummary();          
            return View(ratingTr);
        }
        [HttpGet]
        public JsonResult RatingSummaryList(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID, DateTime? FromDate, int? Sqlqry)
        {
            try
            {
                RatingSummary ratingTr = new RatingSummary();
                var respRating = wpsModel.SP_Reviews_Rating_Summary_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "0", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "0", FromDate, (Sqlqry > 0 && Sqlqry.HasValue) ? Sqlqry.ToString() : null).ToList();
                ratingTr.SP_Reviews_Rating_Summary_Dashboard = respRating.ToList();
                return Json(new { RatingSummary = ratingTr }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review site list is failed. {0}", ex.Message));
                throw e;
            }
        }
        #endregion
    }
}