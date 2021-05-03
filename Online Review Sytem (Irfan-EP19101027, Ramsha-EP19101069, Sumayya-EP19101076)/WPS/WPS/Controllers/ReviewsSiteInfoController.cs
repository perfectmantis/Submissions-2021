using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class ReviewsSiteInfoController : Controller
    {
        WPSServiceModel dbUser = new WPSServiceModel();
        Utility utility = new Utility();

        [Decrypted]
        public ActionResult ReviewsSiteInfo(int? user, int? OrgId, int? CompanyId, int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            ViewBag.SiteID = new SelectList(dbUser.GetAllReviewSites(), "SiteID", "SiteName");
            ViewBag.AccountID = new SelectList(dbUser.GetAllComAccounts(), "ID", "FirstName");
            ViewBag.AccountType = new SelectList(dbUser.GetAllActType(), "ID", "Description");
            ViewBag.ReviewID = null;//new SelectList(dbUser.GetAllYelpReviews(), "ID", "Text");
            ViewBag.Rating = new SelectList(new List<Object>
            {
                new {value = "1.0", text = "1.0"},new {value = "2.0", text = "2.0"},
                new {value = "3.0", text = "3.0"},new {value = "4.0", text = "4.0"},
                new {value = "5.0", text = "5.0"}
            }, "value", "text");

            ReviewSiteTr reviewTr = new ReviewSiteTr();
            return View(reviewTr);
        }
        [HttpGet]
        public JsonResult ReviewsSiteList(int? user, int? OrgId, int? CompanyId, int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            try
            {
                ReviewSiteTr reviewTr = new ReviewSiteTr();
                var respReviewInfo = dbUser.Sp_ReviewsSiteInfo((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (Rating > 0 && Rating.HasValue) ? Rating.ToString() : "%").ToList();
                reviewTr.ReviewList = respReviewInfo.ToList();
                return Json(new { reviewSite = reviewTr }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review site list is failed. {0}", ex.Message));
                throw e;
            }
        }
        [HttpGet]
        public JsonResult ReviewSiteInfoList(int? user, int? OrgId, int? CompanyId, int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            var LstSiteId = dbUser.GetAllReviewSites();

            var LstActId = dbUser.GetAllComAccounts();// new List<SMIM_ReviewAccounts_ST>();
            //if (CompanyId.HasValue && CompanyId.Value > 0)
            //{
            //    LstActId = dbUser.GetAllComAccounts(CompanyId);
            //}

            //if (OrgId.HasValue && OrgId.Value > 0)
            //{
            //    LstActId = dbUser.GetAllComAccounts(OrgId, 0);
            //}

            var LstTypId = dbUser.GetAllActType();

            ViewBag.SiteID = new SelectList(LstSiteId, "SiteID", "SiteName");
            ViewBag.AccountID = new SelectList(dbUser.GetAllComAccounts(), "ID", "FirstName");
            ViewBag.AccountType = new SelectList(dbUser.GetAllActType(), "ID", "Description");
            ViewBag.Rating = new SelectList(new List<Object>
            {
                new {value = "1.0", text = "1.0"},new {value = "2.0", text = "2.0"},
                new {value = "3.0", text = "3.0"},new {value = "4.0", text = "4.0"},
                new {value = "5.0", text = "5.0"}
            }, "value", "text");

            if (SiteID.HasValue && SiteID.Value > 0)
            {
                ViewBag.SiteID = new SelectList(LstSiteId, "SiteID", "SiteName", SiteID.Value);
            }

            if (AccountID.HasValue && AccountID.Value > 0)
            {
                ViewBag.AccountID = new SelectList(LstActId, "ID", "FirstName");
            }

            if (AccountTypeID.HasValue && AccountTypeID.Value > 0)
            {
                ViewBag.AccountType = new SelectList(LstTypId, "ID", "Description");
            }

            ReviewSiteTr reviewTr = new ReviewSiteTr();
            var respReviewInfo = dbUser.Sp_ReviewsSiteInfo((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (Rating > 0 && Rating.HasValue) ? Rating.ToString() : "%").ToList();
            reviewTr.ReviewList = respReviewInfo.ToList();
            return Json(new { reviewSite = reviewTr }, JsonRequestBehavior.AllowGet);
        }
    }
}