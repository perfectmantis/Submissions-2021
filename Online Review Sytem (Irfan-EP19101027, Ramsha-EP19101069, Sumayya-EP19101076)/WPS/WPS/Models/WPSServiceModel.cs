using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Web;
using WPS.WPSService;

namespace WPS.Models
{
    public class WPSServiceModel
    {
        WPSService.WPSService dbUser = new WPSService.WPSService();

        #region Log Activity
        public void AddActivityLog(SMSA_Logs_HI log)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                dbUser.AddActivityLog(log);   
                dbUser.Dispose();
                dbUser.Abort();
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<sp_RptGetUserActivityLog_Result> GetUserActivityLog(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.RptUserActivityLog(FromDate, true, ToDate, true, UserId).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<sp_RptCompanyCreation_Result> GetUserCompanyLog(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.RptUserCompanyLog(FromDate, true, ToDate, true, UserId).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<Sp_RptEmpInfo_Result> GetUserEmpInfo(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.RptUserEmpInfo(FromDate, true, ToDate, true, UserId).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<Sp_RptSalesAccount_Result> GetUserSalesAccount(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.RptUserSalesAccount(FromDate, true, ToDate, true, UserId).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<Sp_RptRFRId_Result> GetUserRFRId(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.RptUserRFID(FromDate, true, ToDate, true, UserId).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<Sp_SifMstDtl_Result> Sp_SifMstDtl(DateTime FromDate, DateTime ToDate, string UserId, string Esid, string PesNo, string ProType)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.Sp_SifMstDtl(FromDate, true, ToDate, true, UserId, Esid, PesNo, ProType).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        #endregion

        #region Organization SMSA_Organization_ST

        public List<SMSA_Organization_ST> GetAllOrganization()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllOrganization().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
       
        public SMSA_Organization_ST GetOrganizationById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetOrganizationById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<SMSA_Organization_ST> GetAllOrganizationByType(string type)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllOrganizationByType(type).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<SMSA_Organization_ST> GetAllOrganizationBySaleAgentId(int SaleAgentId)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetOrganizationsByAgentId(SaleAgentId, true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int InsertOrganization(SMSA_Organization_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = true;
                dbUser.InsertOrganization(org, out UserTypeId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return UserTypeId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public void UpdateOrganization(SMSA_Organization_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                org.OrgIDSpecified = true;
                dbUser.UpdateOrganization(org);
                dbUser.Dispose();
                dbUser.Abort();
                
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public void DeleteOrganization(SMSA_Organization_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                org.OrgIDSpecified = true;
                dbUser.DeleteOrganization(org);
                dbUser.Dispose();
                dbUser.Abort();

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Company SMSA_CompanyMst_ST
        public int checkDuplicateCompanyByAgent(int SaleAccountId, string EstID, string UploadOrApprove)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int isValid = 0; bool isValidSpecified = true;
                if (UploadOrApprove == "A")
                {
                    dbUser.checkDuplicateCompanyByAgent(SaleAccountId, true, EstID, out isValid, out isValidSpecified);
                }
                
                dbUser.Dispose();
                dbUser.Abort();
                return isValid;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SMSA_CompanyMst_ST> GetAllCompanies()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllCompanies().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<SMSA_CompanyMst_ST> GetAllCompaniesByOrgId(int OrgId)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllCompaniesByOrgId(OrgId, true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public SMSA_CompanyMst_ST GetCompanyById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                System.Net.ServicePointManager.Expect100Continue = false;
                var resp = dbUser.GetCompanyById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public int InsertCompany(SMSA_CompanyMst_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = true;
                dbUser.InsertCompany(org, out UserTypeId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return UserTypeId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public void UpdateCompany(SMSA_CompanyMst_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                dbUser.UpdateCompany(org);
                dbUser.Dispose();
                dbUser.Abort();
               
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Sale Account / Agent / Sub Agenet
        public List<SRCC_SalesAccount_ST> GetAllAgents()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllAgents().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SRCC_SalesAccount_ST> GetAllSaleAccount()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllSaleAccount().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SRCC_SalesAccount_ST> GetAllSubAgents()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllSubAgents().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public SRCC_SalesAccount_ST GetAgentById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAgentById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SRCC_SalesAccount_ST> GetAllSubAgentByAgentId(int agentId)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllSubAgentsByAgentId(agentId, true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int InsertSalesAccount(SRCC_SalesAccount_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = true;
                dbUser.InsertSalesAccount(org, out UserTypeId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return UserTypeId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public void UpdateSalesAccount(SRCC_SalesAccount_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                org.SaleAccIdSpecified = true;
                dbUser.UpdateSalesAccount(org);
                dbUser.Dispose();
                dbUser.Abort();

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public void DeleteSalesAccount(SRCC_SalesAccount_ST org)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                org.SaleAccIdSpecified = true;
                dbUser.DeleteSalesAccount(org);
                dbUser.Dispose();
                dbUser.Abort();

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Account Type SMIM_AccountType_ST
        public List<SMIM_AccountType_ST> GetAllActType()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllActType().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public SMIM_AccountType_ST GetAllActTypeById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllActTypeById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int InsertActType(SMIM_AccountType_ST actype)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _ActiD = 0;
                bool specified = false;
                dbUser.InsertActType(actype, out _ActiD, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return _ActiD;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int UpdateActType(SMIM_AccountType_ST actype)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _ActiD = 0;
                bool specified = false;
                dbUser.UpdateActType(actype, out _ActiD, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(actype.ID);

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int DeleteActType(SMIM_AccountType_ST actype)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _ActiD = 0;
                bool specified = false;
                dbUser.DeleteActType(actype, out _ActiD, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(actype.ID);
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Review Accounts SMIM_ReviewAccounts_ST
        public List<SMIM_ReviewAccounts_ST> GetAllComAccounts()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllComAccounts().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SMIM_ReviewAccountName_ST> GetAllAccountsName()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllAccountsName().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SMIM_BenchAccountName_ST> GetBenchAccountsName()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetBenAccountsName().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public SMIM_ReviewAccounts_ST GetAllComAccountsById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllComAccountsById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int InsertComAccounts(SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _ComiD = 0;
                bool specified = false;
                Utility util = new Utility();
                util.IsSpecifed<SMIM_ReviewAccounts_ST>(comAct);
                dbUser.InsertComAccounts(comAct, out _ComiD, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return _ComiD;
            }
            catch (DbEntityValidationException ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                StringBuilder sb = new StringBuilder();
                foreach (var eve in ex.EntityValidationErrors)
                {
                    sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                    eve.Entry.Entity.GetType().Name,
                                                    eve.Entry.State));
                    foreach (var ve in eve.ValidationErrors)
                    {
                        sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                    ve.PropertyName,
                                                    ve.ErrorMessage));
                    }
                }
                throw new DbEntityValidationException(sb.ToString(), ex);
            }
        }
        public int UpdateComAccounts(SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _ComiD = 0;
                bool specified = false;
                dbUser.UpdateComAccounts(comAct, out _ComiD, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(comAct.ID);

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int DeleteComAccounts(SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _ComiD = 0;
                bool specified = false;
                dbUser.DeleteComAccounts(comAct, out _ComiD, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(comAct.ID);
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Review Accounts Sites SMIM_ReviewAccountSite_ST
        public List<SMIM_ReviewAccountSite_ST> GetAllReviewAct()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllReviewAct().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public SMIM_ReviewAccountSite_ST GetAllReviewActById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllReviewActById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SMIM_ReviewAccountSite_ST> GetAllRvActSiteById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllRvActSiteById(id, true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public ReviewCollection GetAllReviewActSiteById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllReviewActSiteById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int InsertReviewAct(SMIM_ReviewAccountSite_ST InsReview)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _AccountSiteID = 0;
                bool specified = false;
                Utility util = new Utility();
                util.IsSpecifed<SMIM_ReviewAccountSite_ST>(InsReview);
                dbUser.InsertReviewAct(InsReview, out _AccountSiteID, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return _AccountSiteID;
            }
            catch (DbEntityValidationException ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                StringBuilder sb = new StringBuilder();
                foreach (var eve in ex.EntityValidationErrors)
                {
                    sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                    eve.Entry.Entity.GetType().Name,
                                                    eve.Entry.State));
                    foreach (var ve in eve.ValidationErrors)
                    {
                        sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                    ve.PropertyName,
                                                    ve.ErrorMessage));
                    }
                }
                throw new DbEntityValidationException(sb.ToString(), ex);
            }
        }
        public int UpdateReviewAct(SMIM_ReviewAccountSite_ST InsReview)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _AccountSiteID = 0;
                bool specified = false;
                dbUser.UpdateReviewAct(InsReview, out _AccountSiteID, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(InsReview.AccountSiteID);

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int DeleteReviewAct(SMIM_ReviewAccountSite_ST InsReview)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _AccountSiteID = 0;
                bool specified = false;
                dbUser.DeleteReviewAct(InsReview, out _AccountSiteID, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(InsReview.AccountSiteID);
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Review Sites SMAM_ReviewSites_ST
        public List<SMAM_ReviewSites_ST> GetAllReviewSites()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllReviewSites().ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public SMAM_ReviewSites_ST GetAllReviewSitesById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllReviewSitesById(id, true);
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int InsertReviewSites(SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _SiteID = 0;
                bool specified = false;
                Utility util = new Utility();
                util.IsSpecifed<SMAM_ReviewSites_ST>(viewSite);
                dbUser.InsertReviewSites(viewSite, out _SiteID, out specified); //out _siteID,
                dbUser.Dispose();
                dbUser.Abort();
                return _SiteID;
            }
            catch (DbEntityValidationException ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                StringBuilder sb = new StringBuilder();
                foreach (var eve in ex.EntityValidationErrors)
                {
                    sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                    eve.Entry.Entity.GetType().Name,
                                                    eve.Entry.State));
                    foreach (var ve in eve.ValidationErrors)
                    {
                        sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                    ve.PropertyName,
                                                    ve.ErrorMessage));
                    }
                }
                throw new DbEntityValidationException(sb.ToString(), ex);
            }
        }
        public int UpdateReviewSites(SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _SiteID = 0;
                bool specified = false;
                dbUser.UpdateReviewSites(viewSite, out _SiteID, out specified); //out _Bankid,
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(viewSite.SiteID);

            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int DeleteReviewSites(SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _SiteID = 0;
                bool specified = false;
                dbUser.DeleteReviewSites(viewSite, out _SiteID, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(viewSite.SiteID);
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Reviews Sites Sp_ReviewsSiteInfo
        public List<Sp_ReviewsSiteInfo_Result> Sp_ReviewsSiteInfo(string SiteID, string AccountID, string AccountTypeID, string Rating)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.Sp_ReviewsSiteInfo(SiteID, AccountID, AccountTypeID, Rating).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }        
        public List<SP_Reviews_Rating_Summary_Dashboard_Result> SP_Reviews_Rating_Summary_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? FromDate, string Sqlqry)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Reviews_Rating_Summary_Dashboard(CompanyID, SiteID, Convert.ToInt32(AccountID), true, Convert.ToInt32(AccountTypeID), true, FromDate, true, Sqlqry).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Benchmark Dashboard
        public List<SP_IsAccount_Benchmark_Dashboard_Result> SP_IsAccount_Benchmark_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? Date)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_IsAccount_Benchmark_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID, Date, true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public List<SP_IsBenAccount_Benchmark_Dashboard_Result> SP_IsBenAccount_Benchmark_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? Date)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_IsBenAccount_Benchmark_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID, Date, true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        #endregion

        #region Admin/Organization/Company Dashboard
        public Dashboard GetDashboard(int CompanyId, DateTime dt)
        {
            dbUser.Timeout = System.Threading.Timeout.Infinite;

            var resp = dbUser.GetDashboard(CompanyId, true, dt, true);


            dbUser.Dispose();
            dbUser.Abort();
            return resp;
        }
        public List<Sp_ReviewsSitesList_Result> Sp_ReviewsSitesList(string SiteID, string AccountID, string AccountTypeID, string Rating)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.Sp_ReviewsSitesList(SiteID, AccountID, AccountTypeID, Rating).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_Reviews_Chart_Dashboard_TR_Result> SP_Reviews_Chart_Dashboard_TR(string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Reviews_Chart_Dashboard_TR(SiteID, AccountID, AccountTypeID).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_Reviews_LineChart_Dashboard_TR_Result> SP_Reviews_LineChart_Dashboard_TR(string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Reviews_LineChart_Dashboard_TR(SiteID, Convert.ToInt32(AccountID), true, Convert.ToInt32(AccountTypeID), true).ToList();
                dbUser.Dispose();
                dbUser.Abort();

                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_GetCompanies_By_Organization_Result> SP_GetCompanies_By_Organization(string OrgName)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_GetCompanies_By_Organization(OrgName).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_Reviews_CompanyWise_Dashboard_Result> SP_Reviews_CompanyWise_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {

                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Reviews_CompanyWise_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_Reviews_Line_CompanyWise_Dashboard_Result> SP_Reviews_Line_CompanyWise_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Reviews_Line_CompanyWise_Dashboard(CompanyID, SiteID, Convert.ToInt32(AccountID), true, Convert.ToInt32(AccountTypeID), true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_Get_Account_By_Company_Result> SP_Get_Account_By_Company(string CompanyID, string OrgID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Get_Account_By_Company(CompanyID, OrgID).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_Review_WordCount_Dashboard_HI_Result> SP_Review_WordCount_Dashboard_HI(int WrdTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_Review_WordCount_Dashboard_HI(WrdTypeID,true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_WordType_Desc_PieChart_Dashboard_HI_Result> SP_WordType_Desc_PieChart_Dashboard_HI(string CompanyID, string SiteID, string AccountID, string AccountTypeID, string WrdTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_WordType_Desc_PieChart_Dashboard_HI(CompanyID, SiteID, AccountID, AccountTypeID, Convert.ToInt32(WrdTypeID), true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_WordDesc_MonthWise_BarChart_Dashboard_HI_Result> SP_WordDesc_MonthWise_BarChart_Dashboard_HI(string CompanyID, string SiteID, string AccountID, string AccountTypeID, string WrdTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_WordDesc_MonthWise_BarChart_Dashboard_HI(CompanyID, SiteID, Convert.ToInt32(AccountID), true, Convert.ToInt32(AccountTypeID), true, Convert.ToInt32(WrdTypeID), true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public List<SP_WordCount_Desc_CloudChart_Dashboard_HI_Result> SP_WordCount_Desc_CloudChart_Dashboard_HI(string CompanyID, string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.SP_WordCount_Desc_CloudChart_Dashboard_HI(CompanyID, SiteID, Convert.ToInt32(AccountID), true, Convert.ToInt32(AccountTypeID), true).ToList();
                dbUser.Dispose();
                dbUser.Abort();
                return resp;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        #endregion

    }
}