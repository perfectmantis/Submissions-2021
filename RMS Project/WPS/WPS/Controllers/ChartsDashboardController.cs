using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using System.ServiceProcess;

namespace WPS.Controllers
{
    public class ChartsDashboardController : Controller
    {
        WPSServiceModel wpsModel = new WPSServiceModel();
        UserServiceModel userModel = new UserServiceModel();
        // GET: ChartsDashboard
        [Decrypted]
        public ActionResult ReviewDashboard(int? user, int? OrgId, int? CompanyId, int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            ViewBag.SiteID = new SelectList(wpsModel.GetAllReviewSites(), "SiteID", "SiteName");
            ViewBag.AccountID = new SelectList(wpsModel.GetAllComAccounts(), "ID", "MiddleName");
            ViewBag.AccountType = new SelectList(wpsModel.GetAllActType(), "ID", "Description");
            var mDashboard = new mDashboard();

            #region Dashboard Pie Chart and Gridview
            //var respChartInfo = wpsModel.SP_Reviews_Chart_Dashboard_TR((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%").ToList();
            //cDashboard.ReviewsChartDashboardTR = respChartInfo.ToList();
            #endregion

            return View(mDashboard);
        }

        public JsonResult ReviewChartList(int? SiteID, int? AccountID, int? AccountTypeID)
        {
            try
            {
                mDashboard mDash = new mDashboard();
                var respChartInfo = wpsModel.SP_Reviews_Chart_Dashboard_TR((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%").ToList();
                mDash.ReviewsPieChartDashboardTR = respChartInfo.ToList();
                return Json(new { reviewsChart = mDash }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
    }
}