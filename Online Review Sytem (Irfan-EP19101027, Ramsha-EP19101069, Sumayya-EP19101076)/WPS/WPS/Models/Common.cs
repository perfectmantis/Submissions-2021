using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WPS.WPSService;
using System.ServiceProcess;
using System.ComponentModel.DataAnnotations;

namespace WPS.Models
{
    public class Common
    {
    }

    public class wordCloud
    {
        public string x { get; set; }
        public int? value { get; set; }
        public string Category { get; set; }
    }

    public class mDashboard : Dashboard
    {
        public List<wordCloud> wordCloudData { get; set; }
        public List<ServiceStatus> serviceControllerC { get; set; }
        public List<Sp_ReviewsSitesList_Result> ReviewsSitesList { get; set; }
        public List<SP_Reviews_Chart_Dashboard_TR_Result> ReviewsPieChartDashboardTR { get; set; }
        public List<SP_Reviews_LineChart_Dashboard_TR_Result> ReviewsLineChartDashboardTR { get; set; }
        public List<SP_GetCompanies_By_Organization_Result> SP_GetCompanies_By_Organization { get; set; }
        public List<SP_Reviews_CompanyWise_Dashboard_Result> SP_Reviews_CompanyWise_Dashboard { get; set; }
        public List<SP_Reviews_Line_CompanyWise_Dashboard_Result> SP_Reviews_Line_CompanyWise_Dashboard { get; set; }
        public List<SP_Get_Account_By_Company_Result> SP_Get_Account_By_Company { get; set; }
        public List<SP_WordType_Desc_PieChart_Dashboard_HI_Result> SP_WordType_Desc_PieChart_Dashboard_HI { get; set; }
        public List<SP_WordDesc_MonthWise_BarChart_Dashboard_HI_Result> SP_WordDesc_MonthWise_BarChart_Dashboard_HI { get; set; }
        public List<SP_WordCount_Desc_CloudChart_Dashboard_HI_Result> SP_WordCount_Desc_CloudChart_Dashboard_HI { get; set; }
        public List<SMSA_Organization_ST> OrgList { get; set; }
        public List<SMSA_CompanyMst_ST> ComList { get; set; }
        public List<SMIM_ReviewAccounts_ST> ActList { get; set; }
        public List<SMAM_ReviewSites_ST> SiteList { get; set; }
        public int OrgCount { get; set; }
        public int ComCount { get; set; }
        public int ActCount { get; set; }
        public int SitCount { get; set; }
        public int RevCount { get; set; }
        public int GoodCount { get; set; }
        public int BadCount { get; set; }
        public string RadCount { get; set; }

    }

    public class ServiceStatus
    {
        public string ServiceName { get; set; }
        public bool IsActive { get; set; }
        public string Status { get; set; }
        public bool IsRunning { get; set; }
    }

    public class CompanyDetail : SMSA_CompanyMst_ST
    {
        public string OrgType { get; set; }
        public int? POrgId { get; set; }
        public int AgentId { get; set; }
        public int SubAgentId { get; set; }
    }
    
    public class ReviewSiteTr
    {
        public string Rating { get; set; }
        public List<Sp_ReviewsSiteInfo_Result> ReviewList { get; set; }
    }

    public class RatingSummary
    {
        public List<SP_Reviews_Rating_Summary_Dashboard_Result> SP_Reviews_Rating_Summary_Dashboard { get; set; }
    }

    public class BenchmarkAct
    {
        public List<SP_IsAccount_Benchmark_Dashboard_Result> SP_IsAccount_Benchmark_Dashboard { get; set; }

        public List<SP_IsBenAccount_Benchmark_Dashboard_Result> SP_IsBenAccount_Benchmark_Dashboard { get; set; }

        public List<SMAM_ReviewSites_ST> SiteNames { get; set; }
    }

    public class RFRFile
    {
        public string RecordType { get; set; }
        public string SIFRef { get; set; }
        public string ACKRef { get; set; }
        public string RountingCode { get; set; }
        public string EmployeeNo { get; set; }
        public Nullable<decimal> AmountToRefund { get; set; }
        public string RequestCode { get; set; }
        public string PAN { get; set; }
        public string Future { get; set; }
        public string Last { get; set; }
    }

    public class ImportEmployeeExcel
    {
        public int CompanyID { get; set; }

        [Required]
        public HttpPostedFileBase[] MyExcelFile { get; set; }

    }

    public class uploadEmployees
    {
        public string EmpCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalNo { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfJoin { get; set; }
        public string MobileNo { get; set; }
        
        public string RoutingCode { get; set; }
        public string IBAN { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal? Travel { get; set; }
        public decimal? Housing { get; set; }
        public int CompanyId { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class ImportCompanyExcel
    {
        [Required]
        public HttpPostedFileBase[] MyExcelFile { get; set; }

    }

    public class uploadCompany
    {
        public int TempId { get; set; }
        public string AgentCode { get; set; }
        public string SubAgentCode { get; set; }
        public string CompanyType { get; set; }
        public string ParentCompanyEstID { get; set; }
        public string CompanyName { get; set; }
        public string EstID { get; set; }
        public string UserName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class ImportSifExcel
    {
        public int AgentId { get; set; }
        public int SubAgentId { get; set; }
        public int SelectedCompanyId { get; set; }
        [Required]
        public HttpPostedFileBase[] MyExcelFile { get; set; }

    }

    public class uploadSif
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public string PersonalNo { get; set; }
        public string RoutingCode { get; set; }
        public string IBAN { get; set; }

        public decimal? BasicSalary { get; set; }
        public decimal? Housing { get; set; }
        public decimal? Conveyance { get; set; }

        public decimal? Medical { get; set; }
        public decimal? AnnualPassage { get; set; }
        public decimal? Overtime { get; set; }
        public decimal? Others { get; set; }
        public decimal? LeaveEncashment { get; set; }
        public int? LeaveDays { get; set; }
        public decimal? Total { get; set; }
        public string ErrorMessage { get; set; }

    }
}