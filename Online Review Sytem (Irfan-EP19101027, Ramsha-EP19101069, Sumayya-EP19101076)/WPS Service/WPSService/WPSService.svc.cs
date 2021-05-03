using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using WPSService.Model;

namespace WPSService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class WPSService : IWPSService
    {
        WPSEntities db = new WPSEntities();
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }

        #region Log Activity
        public void AddActivityLog(SMSA_Logs_HI log)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.SMSA_Logs_HI.Add(log);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public List<sp_RptGetUserActivityLog_Result> RptUserActivityLog(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.sp_RptGetUserActivityLog(FromDate, ToDate, UserId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<sp_RptCompanyCreation_Result> RptUserCompanyLog(DateTime FromDate, DateTime ToDate, string UserId)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.sp_RptCompanyCreation(FromDate, ToDate, UserId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Sp_RptEmpInfo_Result> RptUserEmpInfo(DateTime FromDate, DateTime ToDate, string User)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Sp_RptEmpInfo(FromDate, ToDate, User,"","").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Sp_RptSalesAccount_Result> RptUserSalesAccount(DateTime FromDate, DateTime ToDate, string User)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Sp_RptSalesAccount(FromDate, ToDate, User).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Sp_RptRFRId_Result> RptUserRFID(DateTime FromDate, DateTime ToDate, string User)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Sp_RptRFRId(FromDate, ToDate, User).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Sp_SifMstDtl_Result> Sp_SifMstDtl(DateTime FromDate, DateTime ToDate, string User, string Esid, string PesNo, string ProType)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Sp_SifMstDtl(FromDate, ToDate, User, Esid, PesNo, ProType).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Organization
        public List<SMSA_Organization_ST> GetAllOrganization()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_Organization_ST.ToList();
        }

        public SMSA_Organization_ST GetOrganizationById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_Organization_ST.Where(x => x.OrgID == id).FirstOrDefault();
        }

        public List<SMSA_Organization_ST> GetAllOrganizationByType(string type)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_Organization_ST.Where(x => x.OrgType == type && x.SaleAccId == null).ToList();
        }

        public int InsertOrganization(SMSA_Organization_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxOrgId = 0;
                if (db.SMSA_Organization_ST.Count() > 0)
                {
                    maxOrgId = db.SMSA_Organization_ST.Select(x => x.OrgID).Max();
                }
                maxOrgId = maxOrgId + 1;
                org.OrgID = maxOrgId;
                db.SMSA_Organization_ST.Add(org);
                db.SaveChanges();

                return maxOrgId;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void UpdateOrganization(SMSA_Organization_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(org).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void DeleteOrganization(SMSA_Organization_ST org)
        {
            try
            {
                db.Entry(org).State = EntityState.Deleted;
                db.SaveChanges();


            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public List<SMSA_Organization_ST> GetOrganizationsByAgentId(int agentId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_Organization_ST.Where(x => x.SaleAccId == agentId && x.OrgType == "G").ToList();
        }

        #endregion

        #region Company
      
        public List<SMSA_CompanyMst_ST> GetAllCompanies()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var reqCompanies = db.SMSA_CompanyMst_ST.ToList();
            return reqCompanies;
        }

        public SMSA_CompanyMst_ST GetCompanyById(int id)
        {
            
            db.Configuration.ProxyCreationEnabled = false;
            var reqCompany = db.SMSA_CompanyMst_ST.Where(x => x.CompanyID == id).FirstOrDefault();
            reqCompany.SMSA_Organization_ST = new SMSA_Organization_ST();
            reqCompany.SMSA_Organization_ST = GetOrganizationById(reqCompany.OrgID);
            return reqCompany;
        }
        public List<SMSA_CompanyMst_ST> GetAllCompaniesByOrgId(int OrgId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_CompanyMst_ST.Where(x => x.OrgID == OrgId).ToList();
        }

        public List<SMSA_CompanyMst_ST> GetAllCompaniesBySaleAccountID(int SaleAccountID)
        {
            db.Configuration.ProxyCreationEnabled = false;

            return db.SMSA_CompanyMst_ST.Where(x => x.SaleAccId == SaleAccountID).ToList();
            
        }

        public int checkDuplicateCompanyByAgent(int SaleAccountId, string EstID)
        {
            try
            {
                int AgentId;
                db.Configuration.ProxyCreationEnabled = false;
                
                var reqSaleAccount = GetAgentById(SaleAccountId);
                AgentId = reqSaleAccount != null ? reqSaleAccount.ParentSaleId != null && reqSaleAccount.ParentSaleId > 0 ? reqSaleAccount.ParentSaleId.Value : reqSaleAccount.SaleAccId : 0;
                var reqSubAgent = GetAllSubAgentsByAgentId(AgentId).Select(x => x.SaleAccId).ToList();
                var reqAllCompaniesByAgent = db.SMSA_CompanyMst_ST.Where(x => (x.SaleAccId == AgentId || reqSubAgent.Contains(x.SaleAccId.Value)) && x. EstID == EstID).Select(x => x.EstID).ToList();
                //if (db.SMSA_CompanyMst_ST.Where(x => reqAllCompaniesByAgent.Contains(x.EstID)).Count() > 0)
                if (reqAllCompaniesByAgent.Count() > 0)
                {
                    return 0;
                }
                return 1;
            }
            catch (Exception)
            {

                throw;
            }
        }

    
        public int InsertCompany(SMSA_CompanyMst_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                if ((org.SaleAccId == null || org.SaleAccId == 0) && db.SMSA_CompanyMst_ST.Where(x => x.EstID == org.EstID && x.SaleAccId == null).Count() > 0)
                {
                    return 0;
                }

                if (checkDuplicateCompanyByAgent(org.SaleAccId == null ? 0 : org.SaleAccId.Value, org.EstID) == 0)
                {
                    return 0;
                }

                int maxOrgId = 0;
                if (db.SMSA_CompanyMst_ST.Count() > 0)
                {
                    maxOrgId = db.SMSA_CompanyMst_ST.Select(x => x.CompanyID).Max();
                }
                maxOrgId = maxOrgId + 1;
                org.CompanyID = maxOrgId;
                db.SMSA_CompanyMst_ST.Add(org);
                db.SaveChanges();
                
                return maxOrgId;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void UpdateCompany(SMSA_CompanyMst_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(org).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        public void DeleteCompany(SMSA_CompanyMst_ST org)
        {
            try
            {
                db.Entry(org).State = EntityState.Deleted;
                db.SaveChanges();


            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

       
        #endregion

        #region Sales Account
        public List<SRCC_SalesAccount_ST> GetAllAgents()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SRCC_SalesAccount_ST.Where(x => x.AccountType == "A").ToList();
        }

        public List<SRCC_SalesAccount_ST> GetAllSubAgents()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SRCC_SalesAccount_ST.Where(x => x.AccountType == "A").ToList();
        }

        public List<SRCC_SalesAccount_ST> GetAllSaleAccount()
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                var reqSaleAccount = db.SRCC_SalesAccount_ST.ToList();
                reqSaleAccount.Select(x => x.SRCC_SalesAccount_ST2 = new Model.SRCC_SalesAccount_ST()).ToList();
                //reqSaleAccount.Select(x => x.SRCC_SalesAccount_ST2 = (x.ParentSaleId.HasValue ? GetAgentById(x.ParentSaleId.Value) : new Model.SRCC_SalesAccount_ST())).ToList();
                return reqSaleAccount;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public SRCC_SalesAccount_ST GetAgentById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SRCC_SalesAccount_ST.Where(x => x.SaleAccId == id).FirstOrDefault();
        }

        public SRCC_SalesAccount_ST GetAgentByAccountCode(string Code)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SRCC_SalesAccount_ST.Where(x => x.AccountCode == Code).FirstOrDefault();
        }

        public List<SRCC_SalesAccount_ST> GetAllSubAgentsByAgentId(int agentId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SRCC_SalesAccount_ST.Where(x => x.ParentSaleId == agentId).ToList();
        }

        public int InsertSalesAccount(SRCC_SalesAccount_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxOrgId = 0;
                if (db.SRCC_SalesAccount_ST.Count() > 0)
                {
                    maxOrgId = db.SRCC_SalesAccount_ST.Select(x => x.SaleAccId).Max();
                }
                maxOrgId = maxOrgId + 1;
                org.SaleAccId = maxOrgId;
                db.SRCC_SalesAccount_ST.Add(org);
                db.SaveChanges();

                return maxOrgId;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void UpdateSalesAccount(SRCC_SalesAccount_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(org).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void DeleteSalesAccount(SRCC_SalesAccount_ST org)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(org).State = EntityState.Deleted;
                db.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }


        #endregion    

        #region Account Type
        public List<SMIM_AccountType_ST> GetAllActType()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_AccountType_ST.ToList();
        }
        public SMIM_AccountType_ST GetAllActTypeById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_AccountType_ST.Where(x => x.ID == id).FirstOrDefault();
        }
        public int InsertActType(SMIM_AccountType_ST actype)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                #region Close Max Account ID /*SMIM_AccountType_ST*/
                //int maxActId = 0;
                //if (db.SMIM_AccountType_ST.Count() > 0)
                //{
                //    maxActId = db.SMIM_AccountType_ST.Select(x => x.ID).Max();
                //}
                //maxActId = maxActId + 1;
                //actype.ID = maxActId;
                #endregion
                db.SMIM_AccountType_ST.Add(actype);
                db.SaveChanges();

                return actype.ID;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }

        }
        public int UpdateActType(SMIM_AccountType_ST actype)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(actype).State = EntityState.Modified;
                db.SaveChanges();

                return Convert.ToInt32(actype.ID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        public int DeleteActType(SMIM_AccountType_ST actype)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(actype).State = EntityState.Deleted;
                db.SaveChanges();

                return Convert.ToInt32(actype.ID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        #endregion

        #region Review Accounts
        public List<SMIM_ReviewAccounts_ST> GetAllComAccounts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var resqReview = db.SMIM_ReviewAccounts_ST.Where(x => x.IsBenchmarkAccount == false).ToList();
            resqReview.Select(x => x.SMIM_AccountType_ST.Description);
            return resqReview;
            //return db.SMIM_ReviewAccounts_ST.ToList();
        }
        public List<SMIM_ReviewAccountName_ST> GetAllAccountsName()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var resqReview = db.SMIM_ReviewAccounts_ST.Select(x => new SMIM_ReviewAccountName_ST()
            {
                AccountID = x.ID,
                AccountName = x.FirstName + " " + x.MiddleName + " " + x.LastName,
                IsBenchmarkAccount = x.IsBenchmarkAccount

            }).Where(x => x.IsBenchmarkAccount == false).ToList();
            return resqReview;
        }
        public List<SMIM_BenchAccountName_ST> GetBenAccountsName()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var resqReview = db.SMIM_ReviewAccounts_ST.Select(x => new SMIM_BenchAccountName_ST()
            {
                BenchmarkID = x.ID,
                AccountName = x.FirstName + " " + x.MiddleName + " " + x.LastName,
                IsBenchmarkAccount = x.IsBenchmarkAccount

            }).Where(x => x.IsBenchmarkAccount == true).ToList();
            return resqReview;
        }
        public List<SMIM_ReviewAccounts_ST> GetIsBankComAccounts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var resqReview = db.SMIM_ReviewAccounts_ST.Where(x => x.IsBenchmarkAccount == true).ToList();
            resqReview.Select(x => x.SMIM_AccountType_ST.Description);
            return resqReview;
        }
        public SMIM_ReviewAccounts_ST GetAllComAccountsById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_ReviewAccounts_ST.Where(x => x.ID == id).FirstOrDefault();
        }
        public int InsertComAccounts(SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                #region Close Max Account ID /*SMIM_AccountType_ST*/
                //int maxActId = 0;
                //if (db.SMIM_AccountType_ST.Count() > 0)
                //{
                //    maxActId = db.SMIM_AccountType_ST.Select(x => x.ID).Max();
                //}
                //maxActId = maxActId + 1;
                //actype.ID = maxActId;
                #endregion
                db.SMIM_ReviewAccounts_ST.Add(comAct);
                db.SaveChanges();

                return comAct.ID;
            }
            catch (DbEntityValidationException ex)
            {
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
                //throw ex;
                //return 0;
            }

        }
        public int UpdateComAccounts(SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(comAct).State = EntityState.Modified;
                db.SaveChanges();

                return Convert.ToInt32(comAct.ID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        public int DeleteComAccounts(SMIM_ReviewAccounts_ST comAct)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(comAct).State = EntityState.Deleted;
                db.SaveChanges();

                return Convert.ToInt32(comAct.ID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        #endregion

        #region Review Accounts Site
        public List<SMIM_ReviewAccountSite_ST> GetAllReviewAct()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_ReviewAccountSite_ST.ToList();
        }       
        public List<SMIM_ReviewAccountSite_ST> GetAllRvActSiteById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_ReviewAccountSite_ST.Where(x => x.AccountID == id).ToList();             
        }
        public ReviewCollection GetAllReviewActSiteById(int AccountId)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                ReviewCollection reviewsite = new ReviewCollection();
                reviewsite.Reviewsites = new List<SMAM_ReviewSites_ST>();
                reviewsite.Reviewsites = db.SMAM_ReviewSites_ST.ToList();
                reviewsite.ReviewActsites = db.SMIM_ReviewAccountSite_ST.Where(x => x.AccountID == AccountId).Select(x => new ReviewAccountSite { AccountID = x.AccountID, AccountSiteID = x.AccountSiteID, IsActive = x.IsActive, ReviewSiteID = x.ReviewSiteID, ReviewURL = x.ReviewURL }).ToList();
                return reviewsite;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public SMIM_ReviewAccountSite_ST GetAllReviewActById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_ReviewAccountSite_ST.Where(x => x.AccountSiteID == id).FirstOrDefault();
        }
        public int InsertReviewAct(SMIM_ReviewAccountSite_ST viewAct)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxActSiteID = 0;
                if (db.SMIM_ReviewAccountSite_ST.Count() > 0)
                {
                    maxActSiteID = db.SMIM_ReviewAccountSite_ST.Select(x => x.AccountSiteID).Max();
                }
                maxActSiteID = maxActSiteID + 1;
                viewAct.AccountSiteID = maxActSiteID;
                db.SMIM_ReviewAccountSite_ST.Add(viewAct);
                db.SaveChanges();

                return viewAct.AccountSiteID;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }

        }
        public int UpdateReviewAct(SMIM_ReviewAccountSite_ST viewAct)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(viewAct).State = EntityState.Modified;
                db.SaveChanges();

                return Convert.ToInt32(viewAct.AccountSiteID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        public int DeleteReviewAct(SMIM_ReviewAccountSite_ST viewAct)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(viewAct).State = EntityState.Deleted;
                db.SaveChanges();

                return Convert.ToInt32(viewAct.AccountSiteID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        #endregion

        #region Review Sites
        public List<SMAM_ReviewSites_ST> GetAllReviewSites()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_ReviewSites_ST.Where(x => x.IsActive != false).ToList();
        }
        public SMAM_ReviewSites_ST GetAllReviewSitesById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_ReviewSites_ST.Where(x => x.SiteID == id).FirstOrDefault();
        }
        public int InsertReviewSites(SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;               
                int maxSiteID = 0;
                if (db.SMAM_ReviewSites_ST.Count() > 0)
                {
                    maxSiteID = db.SMAM_ReviewSites_ST.Select(x => x.SiteID).Max();
                }
                maxSiteID = maxSiteID + 1;
                viewSite.SiteID = maxSiteID;
                db.SMAM_ReviewSites_ST.Add(viewSite);
                db.SaveChanges();

                return viewSite.SiteID;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }

        }
        public int UpdateReviewSites(SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(viewSite).State = EntityState.Modified;
                db.SaveChanges();

                return Convert.ToInt32(viewSite.SiteID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        public int DeleteReviewSites(SMAM_ReviewSites_ST viewSite)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(viewSite).State = EntityState.Deleted;
                db.SaveChanges();

                return Convert.ToInt32(viewSite.SiteID);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        #endregion

        #region Reviews
        public List<Sp_ReviewsSiteInfo_Result> Sp_ReviewsSiteInfo(string SiteID, string AccountID, string AccountTypeID, string Rating)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Sp_ReviewsSiteInfo(SiteID, AccountID, AccountTypeID, Rating).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }       
        #endregion

        #region Dashboard Line and Pie Chart
        public Dashboard GetDashboard(int CompanyId, DateTime dt)
        {
            db.Configuration.ProxyCreationEnabled = false;
            //System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
            Dashboard dashboard = new Dashboard();
            DateTime dtTo = dt.Date.AddDays(1).AddSeconds(-1);
            //if (CompanyId < 0)
            //{
            //    //var sifMaster = db.HRPR_SifMaster_TR.Where(x => DateTime.Compare(x.SifDate.Value, dt.Date) >= 0 && DateTime.Compare(x.SifDate.Value, dtTo) <= 0).ToList();
            //    //dashboard.sifMaster = sifMaster.Select(x => new HRPR_SifMaster_TR { SifId = x.SifId, SifDate = x.SifDate, ACK_NAK = x.ACK_NAK, EstID = x.EstID, FileName = x.FileName, SND_CBUAE = x.SND_CBUAE }).ToList();

            //    //var sifIds = sifMaster.Select(y => y.SifId).ToList();
            //    //var sifDetail = db.HRPR_SifDetail_TR.Where(x => sifIds.Contains(x.SifId.Value)).ToList();
            //    //dashboard.sifDetail = sifDetail.Select(x => new HRPR_SifDetail_TR { SifId = x.SifId, SifDtlId = x.SifDtlId, PersonalNo = x.PersonalNo, RoutingCode = x.RoutingCode, IBAN = x.IBAN, Basic = x.Basic, Allowances = x.Allowances, LeavesPeriod = x.LeavesPeriod, NetSalary = x.NetSalary}).ToList();

            //    //var sifAckFiles = sifMaster.Where(x => x.ACK_NAK != null && x.ACK_NAK.Contains(".ack")).Select(x => x.ACK_NAK.Substring((x.ACK_NAK.Length - 16), 12) + ".paf").ToList();
            //    //var pafMaster = db.TBL_PAF.Where(x => sifAckFiles.Contains(x.pafactualname)).ToList();
            //    //dashboard.pafMaster = pafMaster;

            //    //var pafIds = pafMaster.Select(y => y.uploadid).ToList();
            //    //var pafDetail = db.tblPafdetails.Where(x => pafIds.Contains(x.uploadid)).ToList();
            //    //dashboard.pafDetail = pafDetail;
            //}

            //var sifMaster = db.HRPR_SifMaster_TR.Where(x => x.CompanyID == CompanyId && DateTime.Compare(x.SifDate.Value, dt.Date) >= 0 && DateTime.Compare(x.SifDate.Value, dtTo) <= 0).ToList();
            //dashboard.sifMaster = sifMaster;



            //var sifAckFiles = sifMaster.Where(x => x.ACK_NAK != null && x.ACK_NAK.Contains(".ack")).Select(x => x.ACK_NAK.Substring(x.ACK_NAK.Length - 12) + ".paf").ToList();
            //var pafMaster = db.tblPafs.Where(x => sifAckFiles.Contains(x.pafactualname)).ToList();
            //dashboard.pafMaster = pafMaster;

            //var pafIds = pafMaster.Select(y => y.uploadid).ToList();
            //var pafDetail = db.tblPafdetails.Where(x => pafIds.Contains(x.uploadid)).ToList();
            //dashboard.pafDetail = pafDetail;
            return dashboard;
        }
        public List<Sp_ReviewsSitesList_Result> Sp_ReviewsSitesList(string SiteID, string AccountID, string AccountTypeID, string Rating)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.Sp_ReviewsSitesList(SiteID, AccountID, AccountTypeID, Rating).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_ReviewsListFor_Dashboard_TR_Result> SP_ReviewsListFor_Dashboard_TR(string SiteID, string AccountID, string AccountTypeID, string Review, string Rating)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_ReviewsListFor_Dashboard_TR(SiteID, AccountID, AccountTypeID, Review, Rating).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_Reviews_Chart_Dashboard_TR_Result> SP_Reviews_Chart_Dashboard_TR(string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Reviews_Chart_Dashboard_TR(SiteID, AccountID, AccountTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_Reviews_LineChart_Dashboard_TR_Result> SP_Reviews_LineChart_Dashboard_TR(string SiteID, int AccountID, int AccountTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Reviews_LineChart_Dashboard_TR(SiteID, AccountID, AccountTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_GetCompanies_By_Organization_Result> SP_GetCompanies_By_Organization(string OrgName)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_GetCompanies_By_Organization(OrgName).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_Get_Account_By_Company_Result> SP_Get_Account_By_Company(string CompanyID, string OrgID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Get_Account_By_Company(CompanyID, OrgID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_Reviews_CompanyWise_Dashboard_Result> SP_Reviews_CompanyWise_Dashboard(string CompanyID,string SiteID, string AccountID, string AccountTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Reviews_CompanyWise_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_Reviews_Line_CompanyWise_Dashboard_Result> SP_Reviews_Line_CompanyWise_Dashboard(string CompanyID, string SiteID, int AccountID, int AccountTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Reviews_Line_CompanyWise_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_Review_WordCount_Dashboard_HI_Result> SP_Review_WordCount_Dashboard_HI(int WrdTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Review_WordCount_Dashboard_HI(WrdTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_WordType_Desc_PieChart_Dashboard_HI_Result> SP_WordType_Desc_PieChart_Dashboard_HI(string CompanyID, string SiteID, string AccountID, string AccountTypeID, int WrdTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_WordType_Desc_PieChart_Dashboard_HI(CompanyID, SiteID, AccountID, AccountTypeID, WrdTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_WordDesc_MonthWise_BarChart_Dashboard_HI_Result> SP_WordDesc_MonthWise_BarChart_Dashboard_HI(string CompanyID, string SiteID, int AccountID, int AccountTypeID, int WrdTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_WordDesc_MonthWise_BarChart_Dashboard_HI(CompanyID, SiteID, AccountID, AccountTypeID, WrdTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_WordCount_Desc_CloudChart_Dashboard_HI_Result> SP_WordCount_Desc_CloudChart_Dashboard_HI(string CompanyID, string SiteID, int AccountID, int AccountTypeID)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_WordCount_Desc_CloudChart_Dashboard_HI(CompanyID, SiteID, AccountID, AccountTypeID).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Dashboard Rating Summary
        public List<SP_Reviews_Rating_Summary_Dashboard_Result> SP_Reviews_Rating_Summary_Dashboard(string CompanyID, string SiteID, int AccountID, int AccountTypeID, DateTime? FromDate, string Sqlqry)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_Reviews_Rating_Summary_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID, FromDate, Sqlqry).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Benchmark Dashboard
        public List<SP_IsAccount_Benchmark_Dashboard_Result> SP_IsAccount_Benchmark_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? Date)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_IsAccount_Benchmark_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID, Date).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<SP_IsBenAccount_Benchmark_Dashboard_Result> SP_IsBenAccount_Benchmark_Dashboard(string CompanyID, string SiteID, string AccountID, string AccountTypeID, DateTime? Date)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return db.SP_IsBenAccount_Benchmark_Dashboard(CompanyID, SiteID, AccountID, AccountTypeID, Date).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

    }
}
