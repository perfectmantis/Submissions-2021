using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class BenchmarkAccountController : Controller
    {
        // GET: BenchmarkAccount
        WPSServiceModel wpsModel = new WPSServiceModel();
        Utility utility = new Utility();

        #region IsBenchmark Account Dashboard
        [Decrypted]
        public ActionResult IsBenchmarkAccount(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? BenAccountID, int? AccountTypeID, DateTime? Date)
        {
            var BenchmarkAct = new BenchmarkAct();
            BenchmarkAct.SiteNames = wpsModel.GetAllReviewSites();

            //ViewBag.AccountID = new SelectList(wpsModel.GetAllAccountsName(), "AccountID", "AccountName");
            //ViewBag.BenchmarkID = new SelectList(wpsModel.GetBenchAccountsName(), "BenchmarkID", "AccountName");

            var respIsAccount = wpsModel.SP_IsAccount_Benchmark_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", Date).ToList();
            BenchmarkAct.SP_IsAccount_Benchmark_Dashboard = respIsAccount.ToList();

            var respIsbench = wpsModel.SP_IsBenAccount_Benchmark_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (BenAccountID > 0 && BenAccountID.HasValue) ? BenAccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", Date).ToList();
            BenchmarkAct.SP_IsBenAccount_Benchmark_Dashboard = respIsbench.ToList();

            //var respIsAccount = wpsModel.SP_IsAccount_Benchmark_Dashboard("%", "%", "%", "%", null);
            //BenchmarkAct.SP_IsAccount_Benchmark_Dashboard = respIsAccount.ToList();

            //var respIsbench = wpsModel.SP_IsBenAccount_Benchmark_Dashboard("%", "%", "%", "%", null);
            //BenchmarkAct.SP_IsBenAccount_Benchmark_Dashboard = respIsbench.ToList();

            return View(BenchmarkAct);
        }
        
        [HttpGet]
        public ActionResult BenchmarksAccount(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? BenAccountID, int? AccountTypeID, DateTime? Date)
        {
            try
            {
                var BenchmarkAct = new BenchmarkAct();
                ViewBag.AccountID = new SelectList(wpsModel.GetAllAccountsName(), "AccountID", "AccountName");
                ViewBag.BenchmarkID = new SelectList(wpsModel.GetBenchAccountsName(), "BenchmarkID", "AccountName");
                BenchmarkAct.SiteNames = wpsModel.GetAllReviewSites();

                var respIsAccount = wpsModel.SP_IsAccount_Benchmark_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", Date).ToList();
                BenchmarkAct.SP_IsAccount_Benchmark_Dashboard = respIsAccount.ToList();

                var respIsbench = wpsModel.SP_IsBenAccount_Benchmark_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (BenAccountID > 0 && BenAccountID.HasValue) ? BenAccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", Date).ToList();
                BenchmarkAct.SP_IsBenAccount_Benchmark_Dashboard = respIsbench.ToList();

                return View(BenchmarkAct);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Rating star list is failed. {0}", ex.Message));
                throw e;
            }
        }

        [HttpGet]
        public JsonResult RatingStarList(int? user, int? OrgId, int? CompanyID, int? SiteID, int? AccountID, int? BenAccountID, int? AccountTypeID, DateTime? Date)
        {
            try
            {
                BenchmarkAct BenchmarkAct = new BenchmarkAct();

                var respRating1 = wpsModel.SP_IsAccount_Benchmark_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (AccountID > 0 && AccountID.HasValue) ? AccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", Date).ToList();
                BenchmarkAct.SP_IsAccount_Benchmark_Dashboard = respRating1.ToList();

                var respRating2 = wpsModel.SP_IsBenAccount_Benchmark_Dashboard((CompanyID > 0 && CompanyID.HasValue) ? CompanyID.ToString() : "%", (SiteID > 0 && SiteID.HasValue) ? SiteID.ToString() : "%", (BenAccountID > 0 && BenAccountID.HasValue) ? BenAccountID.ToString() : "%", (AccountTypeID > 0 && AccountTypeID.HasValue) ? AccountTypeID.ToString() : "%", Date).ToList();
                BenchmarkAct.SP_IsBenAccount_Benchmark_Dashboard = respRating2.ToList();

                return Json(new { RatingStars = BenchmarkAct }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var e = new Exception(string.Format("Rating star list is failed. {0}", ex.Message));
                throw e;
            }
        }
        #endregion
    }
}