using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class ReportsController : Controller
    {
        UserServiceModel dbUser = new UserServiceModel();
        WPSServiceModel dbWPS = new WPSServiceModel();
        WPS.Utility utility = new Utility();
        // GET: Reports

        public ActionResult _NoDataFound()
        {
            return View();
        }

        public ActionResult UserActivityLog()
        {
            ViewBag.UserId = new SelectList(dbUser.GetAllUsers().ToList(), "UserId", "UserName");
            return View();
        }

        public ActionResult CompanyCreation()
        {
            ViewBag.UserId = new SelectList(dbUser.GetAllUsers().ToList(), "UserId", "UserName");
            return View();
        }

        public ActionResult UserCreationLog()
        {
            ViewBag.UserId = new SelectList(dbUser.GetAllUsers().ToList(), "UserId", "UserName");
            ViewBag.Activity = new SelectList(new List<object>
            {
                new {value = "A", text = "Agent"},
                new {value = "E", text = "Employee"},
                new {value = "S", text = "Sif"},
                new {value = "R", text = "RFR"},
            }, "value", "text");
            return View();
        }

        public ActionResult SifInformation()
        {
            //ViewBag.Status = new SelectList(dbWPS.GetAllSifMaster().ToList(), "SifId", "ProcessType");
            ViewBag.AgentId = new SelectList(dbWPS.GetAllAgents(), "SaleAccId", "SaleAccount");
            ViewBag.SubAgentId = new SelectList(dbWPS.GetAllSubAgentByAgentId(0), "SaleAccId", "SaleAccount");
            ViewBag.EstID = new SelectList(dbWPS.GetAllCompanies(), "EstID", "CompanyName");
            ViewBag.Status = new SelectList(new List<object>
            {
                new {value = "A", text = "Approved"},
                new {value = "P", text = "Pending"},
                new {value = "V", text = "Verified"},
                new {value = "D", text = "Deliver"},
            }, "value", "text");
            return View();
        }

        public ActionResult SifApproved()
        {
            ViewBag.AgentId = new SelectList(dbWPS.GetAllAgents(), "SaleAccId", "SaleAccount");
            ViewBag.SubAgentId = new SelectList(dbWPS.GetAllSubAgentByAgentId(0), "SaleAccId", "SaleAccount");
            ViewBag.EstID = new SelectList(dbWPS.GetAllCompanies(), "EstID", "CompanyName");
            return View();
        }

        public ActionResult GetUserActivityLog(DateTime FromDate, DateTime ToDate, int UserId, string fileType)
        {
            string path = "";
            string datasetName = "";
            string paperOrientation = "P";

            var resp = dbWPS.GetUserActivityLog(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%");


            if (resp != null && resp.Count > 0)
            {

                ReportParameter[] parms = new ReportParameter[1];
                parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[2] = new ReportParameter("User", "");

                path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "UserActivityLog.rdlc");
                datasetName = "dsActivityLog";

                return utility.GenerateReport(datasetName, path, resp, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
            }
            return RedirectToAction("_NoDataFound", "Reports", new { q = Request.QueryString["q"].ToString() });
        }

        public ActionResult GetUserCompanyLog(DateTime FromDate, DateTime ToDate, int UserId, string fileType)
        {
            string path = "";
            string datasetName = "";
            string paperOrientation = "L";

            var resp = dbWPS.GetUserCompanyLog(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%");


            if (resp != null && resp.Count > 0)
            {

                ReportParameter[] parms = new ReportParameter[1];
                parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[2] = new ReportParameter("User", "");

                path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "CompanyCreation.rdlc");
                datasetName = "dsUserCompanyLog";

                return utility.GenerateReport(datasetName, path, resp, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
            }
            return RedirectToAction("_NoDataFound", "Reports", new { q = Request.QueryString["q"].ToString() });
        }

        public ActionResult GetUserCreationLog(DateTime FromDate, DateTime ToDate, int UserId, string fileType, string Activity)
        {
            string path = "";
            string datasetName = "";
            string paperOrientation = "L";

            if (Activity == "A")
            {
                var respSales = dbWPS.GetUserSalesAccount(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%");
                if (respSales != null && respSales.Count > 0)
                {
                    ReportParameter[] parms = new ReportParameter[1];
                    parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                    //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                    //parms[2] = new ReportParameter("User", "");

                    path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "Rpt_Agent.rdlc");
                    datasetName = "dsAgent";

                    return utility.GenerateReport(datasetName, path, respSales, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
                }
            }
            else if (Activity == "E")
            {
                var respEmp = dbWPS.GetUserEmpInfo(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%");

                if (respEmp != null && respEmp.Count > 0)
                {

                    ReportParameter[] parms = new ReportParameter[1];
                    parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                    //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                    //parms[2] = new ReportParameter("User", "");

                    path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "Rpt_Employee.rdlc");
                    datasetName = "dsEmployee";

                    return utility.GenerateReport(datasetName, path, respEmp, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
                }
            }
            else if (Activity == "R")
            {
                //var respRFRID = dbWPS.GetUserRFRId(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%");

                //if (respRFRID != null && respRFRID.Count > 0)
                //{
                //    ReportParameter[] parms = new ReportParameter[1];
                //    parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //    //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //    //parms[2] = new ReportParameter("User", "");

                //    path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "Rpt_RFR.rdlc");
                //    datasetName = "dsRFR";

                //    return utility.GenerateReport(datasetName, path, respRFRID, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
                //}
            }
            else if (Activity == "S")
            {
                var respSif = dbWPS.Sp_SifMstDtl(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%", "%", "%", "%");

                if (respSif != null && respSif.Count > 0)
                {
                    ReportParameter[] parms = new ReportParameter[1];
                    parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                    //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                    //parms[2] = new ReportParameter("User", "");

                    path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "Rpt_SifInfo.rdlc");
                    datasetName = "dsSif";

                    return utility.GenerateReport(datasetName, path, respSif, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
                }
            }
            return RedirectToAction("_NoDataFound", "Reports", new { q = Request.QueryString["q"].ToString() });
        }

        public ActionResult GetSifInformationLog(DateTime FromDate, DateTime ToDate, int UserId,int CompanyId,string PesNo, string ProType, string fileType)
        {
            string path = "";
            string datasetName = "";
            string paperOrientation = "L";
            var respSif = dbWPS.Sp_SifMstDtl(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%", CompanyId.ToString() != "" ? CompanyId.ToString() : "%", PesNo != "" ? PesNo : "%", ProType != "" ? ProType : "%");

            if (respSif != null && respSif.Count > 0)
            {
                ReportParameter[] parms = new ReportParameter[1];
                parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[2] = new ReportParameter("User", "");

                path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "Rpt_SifInfo.rdlc");
                datasetName = "dsSif";

                return utility.GenerateReport(datasetName, path, respSif, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
            }

            return RedirectToAction("_NoDataFound", "Reports", new { q = Request.QueryString["q"].ToString() });
        }

        public ActionResult GetSifApprovedLog(DateTime FromDate, DateTime ToDate, int UserId, int CompanyId, string PesNo, string ProType, string fileType)
        {
            string path = "";
            string datasetName = "";
            string paperOrientation = "L";
            var respSif = dbWPS.Sp_SifMstDtl(FromDate, ToDate, UserId > 0 ? UserId.ToString() : "%", CompanyId.ToString() != "" ? CompanyId.ToString() : "%", PesNo != "" ? PesNo : "%", ProType);

            if (respSif != null && respSif.Count > 0)
            {
                ReportParameter[] parms = new ReportParameter[1];
                parms[0] = new ReportParameter("Date", "From : " + Convert.ToDateTime(FromDate).ToString("dd-MMM-yyyy") + " till " + Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[1] = new ReportParameter("ToDate", Convert.ToDateTime(ToDate).ToString("dd-MMM-yyyy"));
                //parms[2] = new ReportParameter("User", "");

                path = System.IO.Path.Combine(Server.MapPath("~/Reports/"), "Rpt_SifInfo.rdlc");
                datasetName = "dsSif";

                return utility.GenerateReport(datasetName, path, respSif, fileType, "0.25", "0.25", "0.25", "0.25", "A4", paperOrientation, parms);
            }

            return RedirectToAction("_NoDataFound", "Reports", new { q = Request.QueryString["q"].ToString() });
        }
    }
}