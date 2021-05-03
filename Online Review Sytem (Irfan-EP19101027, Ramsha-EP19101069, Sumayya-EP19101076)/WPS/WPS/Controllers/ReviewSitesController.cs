using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class ReviewSitesController : Controller
    {
        WPSServiceModel dbUser = new WPSServiceModel();
        Utility utility = new Utility();

        [Decrypted]

        #region Review Sites
        public ActionResult ReviewSitesIndex()
        {
            var respReviewSites = dbUser.GetAllReviewSites().ToList();
            return View(respReviewSites);
        }
        [Decrypted]
        public ActionResult ReviewSites(int Code)
        {
            
            if (Code > 0)
            {
                var respReviewSites = dbUser.GetAllReviewSitesById(Code);                
                return View(respReviewSites);
            }
            return View();
        }

        [HttpPost]
        [Decrypted]
        public ActionResult ReviewSites(int? user, SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                if (viewSite.SiteID > 0)
                {
                    utility.IsSpecifed<SMAM_ReviewSites_ST>(viewSite);
                    int maxValue = dbUser.UpdateReviewSites(viewSite);
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

                    utility.IsSpecifed<SMAM_ReviewSites_ST>(viewSite);
                    int maxValue = dbUser.InsertReviewSites(viewSite);
                    viewSite.SiteID = maxValue;
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
                Log.LogWrite(ex.Message, "Review Sites Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Decrypted]
        public ActionResult DeleteReviewSites(int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var ReviewSite = dbUser.GetAllReviewSitesById(Code);
                int maxValue = dbUser.DeleteReviewSites(ReviewSite);
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
                Log.LogWrite(ex.Message, "Review Sites Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }
        #endregion
    }
}