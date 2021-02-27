using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using WPSService.Model;

namespace WPSService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IWPSService
    {

        [OperationContract]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);

        #region Log Activity
        [OperationContract]
        void AddActivityLog(SMSA_Logs_HI log);

        [OperationContract]
        List<sp_RptGetUserActivityLog_Result> RptUserActivityLog(DateTime FromDate, DateTime ToDate, string UserId);

        [OperationContract]
        List<sp_RptCompanyCreation_Result> RptUserCompanyLog(DateTime FromDate, DateTime ToDate, string UserId);

        [OperationContract]
        List<Sp_RptSalesAccount_Result> RptUserSalesAccount(DateTime FromDate, DateTime ToDate, string User);

        [OperationContract]
        List<Sp_RptRFRId_Result> RptUserRFID(DateTime FromDate, DateTime ToDate, string User);

        [OperationContract]
        List<Sp_RptEmpInfo_Result> RptUserEmpInfo(DateTime FromDate, DateTime ToDate, string User);

        [OperationContract]
        List<Sp_SifMstDtl_Result> Sp_SifMstDtl(DateTime FromDate, DateTime ToDate, string User, string Esid, string PesNo, string ProType);
        
        #endregion

        #region Organization
        [OperationContract]
        List<SMSA_Organization_ST> GetAllOrganization();

        [OperationContract]
        SMSA_Organization_ST GetOrganizationById(int id);

        [OperationContract]
        List<SMSA_Organization_ST> GetOrganizationsByAgentId(int agentId);

        [OperationContract]
        List<SMSA_Organization_ST> GetAllOrganizationByType(string type);

        [OperationContract]
        int InsertOrganization(SMSA_Organization_ST org);

        [OperationContract]
        void UpdateOrganization(SMSA_Organization_ST org);

        [OperationContract]
        void DeleteOrganization(SMSA_Organization_ST org);
        #endregion

        #region Company
        [OperationContract]
        int checkDuplicateCompanyByAgent(int SaleAccountId, string EstID);
       

       [OperationContract]
        List<SMSA_CompanyMst_ST> GetAllCompanies();

        [OperationContract]
        SMSA_CompanyMst_ST GetCompanyById(int Id);

        [OperationContract]
        List<SMSA_CompanyMst_ST> GetAllCompaniesByOrgId(int OrgId);

        [OperationContract]
        List<SMSA_CompanyMst_ST> GetAllCompaniesBySaleAccountID(int SaleAccountID);

        [OperationContract]
        int InsertCompany(SMSA_CompanyMst_ST org);

        [OperationContract]
        void UpdateCompany(SMSA_CompanyMst_ST org);

        [OperationContract]
        void DeleteCompany(SMSA_CompanyMst_ST org);

        #endregion

        #region Sale Account / Agent
        [OperationContract]
        List<SRCC_SalesAccount_ST> GetAllAgents();

        [OperationContract]
        List<SRCC_SalesAccount_ST> GetAllSubAgents();

        [OperationContract]
        List<SRCC_SalesAccount_ST> GetAllSaleAccount();

        [OperationContract]
        SRCC_SalesAccount_ST GetAgentById(int id);

        [OperationContract]
        SRCC_SalesAccount_ST GetAgentByAccountCode(string Code);

        [OperationContract]
        List<SRCC_SalesAccount_ST> GetAllSubAgentsByAgentId(int agentId);

        [OperationContract]
        int InsertSalesAccount(SRCC_SalesAccount_ST org);

        [OperationContract]
        void UpdateSalesAccount(SRCC_SalesAccount_ST org);

        [OperationContract]
        void DeleteSalesAccount(SRCC_SalesAccount_ST org);
        #endregion

        #region Account Type
        [OperationContract]
        List<SMIM_AccountType_ST> GetAllActType();

        [OperationContract]
        SMIM_AccountType_ST GetAllActTypeById(int id);

        [OperationContract]
        int InsertActType(SMIM_AccountType_ST actype);

        [OperationContract]
        int UpdateActType(SMIM_AccountType_ST actype);

        [OperationContract]
        int DeleteActType(SMIM_AccountType_ST actype);

        #endregion

        #region Review Accounts
        [OperationContract]
        List<SMIM_ReviewAccounts_ST> GetAllComAccounts();

        [OperationContract]
        List<SMIM_ReviewAccountName_ST> GetAllAccountsName();

        [OperationContract]
        List<SMIM_BenchAccountName_ST> GetBenAccountsName();

        [OperationContract]
        SMIM_ReviewAccounts_ST GetAllComAccountsById(int id);

        [OperationContract]
        int InsertComAccounts(SMIM_ReviewAccounts_ST comAct);

        [OperationContract]
        int UpdateComAccounts(SMIM_ReviewAccounts_ST comAct);

        [OperationContract]
        int DeleteComAccounts(SMIM_ReviewAccounts_ST comAct);
        #endregion

        #region Review Account Sites
        [OperationContract]
        List<SMIM_ReviewAccountSite_ST> GetAllReviewAct();

        [OperationContract]
        SMIM_ReviewAccountSite_ST GetAllReviewActById(int id);

        [OperationContract]
        List<SMIM_ReviewAccountSite_ST> GetAllRvActSiteById(int id);

        [OperationContract]
        ReviewCollection GetAllReviewActSiteById(int id);

        [OperationContract]
        int InsertReviewAct(SMIM_ReviewAccountSite_ST viewAct);

        [OperationContract]
        int UpdateReviewAct(SMIM_ReviewAccountSite_ST viewAct);

        [OperationContract]
        int DeleteReviewAct(SMIM_ReviewAccountSite_ST viewAct);

        #endregion

        #region Review Sites
        [OperationContract]
        List<SMAM_ReviewSites_ST> GetAllReviewSites();

        [OperationContract]
        SMAM_ReviewSites_ST GetAllReviewSitesById(int id);

        [OperationContract]
        int InsertReviewSites(SMAM_ReviewSites_ST viewSite);

        [OperationContract]
        int UpdateReviewSites(SMAM_ReviewSites_ST viewSite);

        [OperationContract]
        int DeleteReviewSites(SMAM_ReviewSites_ST viewSite);

        #endregion

        #region Reviews
        [OperationContract]
        List<Sp_ReviewsSiteInfo_Result> Sp_ReviewsSiteInfo(string SiteID, string AccountID, string AccountTypeID, string Rating);
        #endregion

        #region Dashboard
        [OperationContract]

        Dashboard GetDashboard(int CompanyId, DateTime dt);

        [OperationContract]
        List<Sp_ReviewsSitesList_Result> Sp_ReviewsSitesList(string SiteID, string AccountID, string AccountTypeID, string Rating);

        [OperationContract]
        List<SP_ReviewsListFor_Dashboard_TR_Result> SP_ReviewsListFor_Dashboard_TR(string SiteID, string AccountID, string AccountTypeID,string Review, string Rating);

        [OperationContract]
        List<SP_Reviews_Chart_Dashboard_TR_Result> SP_Reviews_Chart_Dashboard_TR(string SiteID, string AccountID, string AccountTypeID);

        [OperationContract]
        List<SP_Reviews_LineChart_Dashboard_TR_Result> SP_Reviews_LineChart_Dashboard_TR(string SiteID, int AccountID, int AccountTypeID);

        [OperationContract]
        List<SP_GetCompanies_By_Organization_Result> SP_GetCompanies_By_Organization(string OrgName);

        [OperationContract]
        List<SP_Get_Account_By_Company_Result> SP_Get_Account_By_Company(string CompanyID, string OrgID);

        [OperationContract]
        List<SP_Reviews_CompanyWise_Dashboard_Result> SP_Reviews_CompanyWise_Dashboard(string CompnayID, string SiteID, string AccountID, string AccountTypeID);

        [OperationContract]
        List<SP_Reviews_Line_CompanyWise_Dashboard_Result> SP_Reviews_Line_CompanyWise_Dashboard(string CompnayID, string SiteID, int AccountID, int AccountTypeID);

        [OperationContract]
        List<SP_Review_WordCount_Dashboard_HI_Result> SP_Review_WordCount_Dashboard_HI(int WrdTypeID);

        [OperationContract]
        List<SP_WordType_Desc_PieChart_Dashboard_HI_Result> SP_WordType_Desc_PieChart_Dashboard_HI(string CompanyID, string SiteID, string AccountID, string AccountTypeID, int WrdTypeID);

        [OperationContract]
        List<SP_WordDesc_MonthWise_BarChart_Dashboard_HI_Result> SP_WordDesc_MonthWise_BarChart_Dashboard_HI(string CompanyID, string SiteID, int AccountID, int AccountTypeID, int WrdTypeID);
        [OperationContract]
        List<SP_WordCount_Desc_CloudChart_Dashboard_HI_Result> SP_WordCount_Desc_CloudChart_Dashboard_HI(string CompanyID, string SiteID, int AccountID, int AccountTypeID);
        #endregion

        #region Dashboard Rating Summary
        [OperationContract]
        List<SP_Reviews_Rating_Summary_Dashboard_Result> SP_Reviews_Rating_Summary_Dashboard(string CompanyID, string SiteID, int AccountID, int AccountTypeID, DateTime? FromDate, string Sqlqry);
        #endregion

        #region Benchmark Dashboard
        [OperationContract]
        List<SP_IsAccount_Benchmark_Dashboard_Result> SP_IsAccount_Benchmark_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? Date);

        [OperationContract]
        List<SP_IsBenAccount_Benchmark_Dashboard_Result> SP_IsBenAccount_Benchmark_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? Date);
        #endregion

        // TODO: Add your service operations here
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
