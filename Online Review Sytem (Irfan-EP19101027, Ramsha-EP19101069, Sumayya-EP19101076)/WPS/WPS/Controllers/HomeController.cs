using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using System.ServiceProcess;
namespace WPS.Controllers
{
    public class HomeController : Controller
    {
        WPSServiceModel wpsModel = new WPSServiceModel();
        UserServiceModel userModel = new UserServiceModel();
        // GET: Home
        [Decrypted]
        public ActionResult Dashboard(int? user, int? OrgId, int? CompanyId, int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            ViewBag.SiteID = new SelectList(wpsModel.GetAllReviewSites(), "SiteID", "SiteName");
            ViewBag.AccountID = new SelectList(wpsModel.GetAllComAccounts(), "ID", "MiddleName");
            ViewBag.AccountType = new SelectList(wpsModel.GetAllActType(), "ID", "Description");
            var mDashboard = new mDashboard();

            #region Reviews Site List
            mDashboard.ActList = wpsModel.GetAllComAccounts();
            mDashboard.ActCount = mDashboard.ActList.Count();

            var respGetReviews = wpsModel.Sp_ReviewsSitesList((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (Rating > 0 && Rating.HasValue) ? Rating.ToString() : "%");
            mDashboard.RevCount = respGetReviews.Sum(x => x.TotalReview.Value);

            var respReviewInfo = wpsModel.Sp_ReviewsSitesList((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (Rating > 0 && Rating.HasValue) ? Rating.ToString() : "%").ToList();
            mDashboard.ReviewsSitesList = respReviewInfo.ToList();

            var respBWordInfo = wpsModel.SP_Review_WordCount_Dashboard_HI(1);
            mDashboard.BadCount = respBWordInfo.Select(x => x.WrdTypeCount).FirstOrDefault();

            var respGWordInfo = wpsModel.SP_Review_WordCount_Dashboard_HI(2);
            mDashboard.GoodCount = respGWordInfo.Select(x => x.WrdTypeCount).FirstOrDefault();
            #endregion

            return View(mDashboard);
        }
        public ActionResult AdminDashboard(int? user, int? OrgId, int? CompanyId, string OrgName)
        {
            var mDashboard = new mDashboard();
            mDashboard.OrgList = wpsModel.GetAllOrganization();
            mDashboard.OrgCount = mDashboard.OrgList.Count();

            mDashboard.ComList = wpsModel.GetAllCompanies();
            mDashboard.ComCount = mDashboard.ComList.Count();

            mDashboard.ActList = wpsModel.GetAllComAccounts();
            mDashboard.ActCount = mDashboard.ActList.Count();

            mDashboard.SiteList = wpsModel.GetAllReviewSites();
            mDashboard.SitCount = mDashboard.SiteList.Count();

            var respGetOrgList = wpsModel.SP_GetCompanies_By_Organization(String.IsNullOrEmpty(OrgName) ? "%" : OrgName);
            mDashboard.SP_GetCompanies_By_Organization = respGetOrgList.ToList();
            mDashboard.SiteList = wpsModel.GetAllReviewSites();
            return View(mDashboard);
        }
        public ActionResult OrganizationDashboard(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            ViewBag.OrgID = new SelectList(wpsModel.GetAllOrganization(), "OrgID", "Description");
            ViewBag.CompanyID = new SelectList(wpsModel.GetAllCompaniesByOrgId(OrgId.Value), "CompanyID", "CompanyName");
            ViewBag.SiteID = new SelectList(wpsModel.GetAllReviewSites(), "SiteID", "SiteName");
            ViewBag.AccountID = new SelectList(wpsModel.GetAllComAccounts(), "ID", "MiddleName");
            ViewBag.AccountType = new SelectList(wpsModel.GetAllActType(), "ID", "Description");
            var mDashboard = new mDashboard();

            mDashboard.ComList = wpsModel.GetAllCompanies();
            mDashboard.ComCount = mDashboard.ComList.Count();

            mDashboard.ActList = wpsModel.GetAllComAccounts();
            mDashboard.ActCount = mDashboard.ActList.Count();

            var respGetReviews = wpsModel.Sp_ReviewsSitesList((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (Rating > 0 && Rating.HasValue) ? Rating.ToString() : "%");
            mDashboard.RevCount = respGetReviews.Sum(x => x.TotalReview.Value);

            var respGetAccount = wpsModel.SP_Get_Account_By_Company((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (OrgId > 0 && OrgId.HasValue) ? OrgId.ToString() : "%");
            mDashboard.SP_Get_Account_By_Company = respGetAccount.ToList();

            mDashboard.ReviewsSitesList = respGetReviews.ToList();

            return View(mDashboard);
        }
        public ActionResult GraphicalDashboard()
        {
            return View();
        }
        public JsonResult ReviewList(int? SiteID, int? AccountID, int? AccountTypeID, decimal? Rating)
        {
            try
            {
                mDashboard mDash = new mDashboard();
                var respReviewInfo = wpsModel.Sp_ReviewsSitesList((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (Rating > 0 && Rating.HasValue) ? Rating.ToString() : "%").ToList();
                mDash.ReviewsSitesList = respReviewInfo.ToList();
                return Json(new { reviewSite = mDash }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review site list is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult ReviewChartList(int? SiteID, int? AccountID, int? AccountTypeID)
        {
            try
            {
                mDashboard mDash = new mDashboard();
                var respChartInfo = wpsModel.SP_Reviews_Chart_Dashboard_TR((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%").ToList();
                mDash.ReviewsPieChartDashboardTR = respChartInfo.ToList();
                return Json(new { reviewsPieChart = mDash }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult ReviewLineChartList(int? SiteID, int? AccountID, int? AccountTypeID)
        {
            try
            {
                mDashboard eDash = new mDashboard();
                var respChartInfo = wpsModel.SP_Reviews_LineChart_Dashboard_TR((SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "0", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "0").ToList();
                eDash.ReviewsLineChartDashboardTR = respChartInfo.ToList();
                return Json(new { reviewsLineChart = eDash }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }        
        public JsonResult GetorgAdmindash(string OrgName)
        {
            try
            {
                mDashboard mDashboard = new mDashboard();                
                var respGetOrgList = wpsModel.SP_GetCompanies_By_Organization(String.IsNullOrEmpty(OrgName) ? "%" : "%" + OrgName + "%");
                mDashboard.SP_GetCompanies_By_Organization = respGetOrgList.ToList();
                return Json(new { orgcompany = mDashboard }, JsonRequestBehavior.AllowGet);
                
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult ReviewCompanyPieChartList(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID)
        {
            try
            {
                mDashboard mDash = new mDashboard();
                var respCompanyInfo = wpsModel.SP_Reviews_CompanyWise_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%").ToList();
                mDash.SP_Reviews_CompanyWise_Dashboard = respCompanyInfo.ToList();
                return Json(new { reviewsCompanyPieChart = mDash }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult ReviewCompanyLineChartList(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID)
        {
            try
            {
                mDashboard eDash = new mDashboard();
                var respCompanyInfo = wpsModel.SP_Reviews_Line_CompanyWise_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "0", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "0").ToList();
                eDash.SP_Reviews_Line_CompanyWise_Dashboard = respCompanyInfo.ToList();
                return Json(new { reviewsCompanyLineChart = eDash }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult GetCompanyOrgdash(int? OrgId, int? CompanyID)
        {
            try
            {
                mDashboard mDashboard = new mDashboard();
                var respGetOrgList = wpsModel.SP_Get_Account_By_Company((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (OrgId > 0 && OrgId.HasValue) ? OrgId.ToString() : "%");
                mDashboard.SP_Get_Account_By_Company = respGetOrgList.ToList();
                return Json(new { organizationcompany = mDashboard }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult GetwordTypePieChartList(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID, int? WrdTypeID)
        {
            try
            {
                mDashboard mDashboard = new mDashboard();
                var respWordTypeList = wpsModel.SP_WordType_Desc_PieChart_Dashboard_HI((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", (WrdTypeID > 0 && WrdTypeID.HasValue) ? WrdTypeID.ToString() : "0");
                mDashboard.SP_WordType_Desc_PieChart_Dashboard_HI = respWordTypeList.ToList();
                return Json(new { wordtypedesc = mDashboard }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult GetwordDescBarChartList(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID, int? WrdTypeID)
        {
            try
            {
                mDashboard mDashboard = new mDashboard();
                var respWordDescList = wpsModel.SP_WordDesc_MonthWise_BarChart_Dashboard_HI((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "0", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "0", (WrdTypeID > 0 && WrdTypeID.HasValue) ? WrdTypeID.ToString() : "0");
                mDashboard.SP_WordDesc_MonthWise_BarChart_Dashboard_HI = respWordDescList.ToList();
                return Json(new { worddescbar = mDashboard }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review bar chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
        public JsonResult GetwordCountCloudCharts(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? AccountTypeID)
        {
            try
            {
                mDashboard mDashboard = new mDashboard();
                var respWordCountList = wpsModel.SP_WordCount_Desc_CloudChart_Dashboard_HI((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "0", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "0");
                mDashboard.wordCloudData = respWordCountList.Select(p => new wordCloud { x = p.Word, value = p.WordCount, Category = p.WorType }).ToList();
                return Json(new { wordcloudcount = mDashboard }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Review bar chart details is failed. {0}", ex.Message));
                throw e;
            }
        }
    }
}