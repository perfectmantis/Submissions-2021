using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class CompanyController : Controller
    {
        WPSServiceModel dbUser = new WPSServiceModel();
        UserServiceModel db = new UserServiceModel();
        Utility utility = new Utility();
        DataTable dt = new DataTable();

        // GET: Company
        [Decrypted]
        public ActionResult CompanyIndex(int? user, int? OrgId, int? CompanyId)
        {
            if (CompanyId.HasValue && CompanyId.Value > 0)
            {
                var reqCompany = dbUser.GetCompanyById(CompanyId.Value);
                return View(reqCompany);
            }

            if (OrgId.HasValue && OrgId.Value > 0)
            {
                var reqOrg = dbUser.GetOrganizationById(OrgId.Value);
                return View(reqOrg.SMSA_CompanyMst_ST.ToList());
            }

            var reqCompanies = dbUser.GetAllCompanies();


            return View(reqCompanies.ToList());
        }

        [Decrypted]
        public ActionResult Company(int? user, int? OrgId, int? CompanyId, int? Code)
        {
            ViewBag.OrgType = new SelectList(new List<Object>
            {
                new {value = "G", text = "Group of Companies"},
                new {value = "C", text = "Company"},

            }, "value", "text");

            // ViewBag.SaleAccId = new SelectList(dbUser.GetAllOrganizationByType("G"), "OrgID", "Description");
            ViewBag.AgentId = new SelectList(dbUser.GetAllAgents(), "SaleAccId", "SaleAccount");
            ViewBag.SubAgentId = new SelectList(dbUser.GetAllSubAgentByAgentId(0), "SaleAccId", "SaleAccount");
            ViewBag.POrgId = new SelectList(dbUser.GetAllOrganizationByType("N"), "OrgID", "Description");
            if (Code.HasValue && Code.Value > 0)
            {
                var reqCompany = dbUser.GetCompanyById(Code.Value);
                CompanyDetail tempComp = new CompanyDetail();

                string OrgType = reqCompany.SMSA_Organization_ST.OrgType;

                if (reqCompany.SaleAccId.HasValue)
                {
                    reqCompany.SRCC_SalesAccount_ST = new WPSService.SRCC_SalesAccount_ST();
                    reqCompany.SRCC_SalesAccount_ST = dbUser.GetAgentById(reqCompany.SaleAccId.Value);
                }

                if (reqCompany.SRCC_SalesAccount_ST == null )
                {
                    ViewBag.AgentId = new SelectList(dbUser.GetAllAgents(), "SaleAccId", "SaleAccount");
                    ViewBag.SubAgentId = new SelectList(dbUser.GetAllSubAgentByAgentId(0), "SaleAccId", "SaleAccount");
                }
                else if (reqCompany.SRCC_SalesAccount_ST.AccountType == "S")
                {
                    tempComp.AgentId = reqCompany.SRCC_SalesAccount_ST.ParentSaleId.Value;
                    tempComp.SubAgentId = reqCompany.SRCC_SalesAccount_ST.SaleAccId;
                    ViewBag.AgentId = new SelectList(dbUser.GetAllAgents(), "SaleAccId", "SaleAccount", reqCompany.SRCC_SalesAccount_ST.ParentSaleId);
                    ViewBag.SubAgentId = new SelectList(dbUser.GetAllSubAgentByAgentId(reqCompany.SRCC_SalesAccount_ST.ParentSaleId.Value), "SaleAccId", "SaleAccount", reqCompany.SRCC_SalesAccount_ST.SaleAccId);
                }
                else
                {
                    tempComp.AgentId = reqCompany.SRCC_SalesAccount_ST.SaleAccId;
                    ViewBag.AgentId = new SelectList(dbUser.GetAllAgents(), "SaleAccId", "SaleAccount", reqCompany.SRCC_SalesAccount_ST.SaleAccId);
                    ViewBag.SubAgentId = new SelectList(dbUser.GetAllSubAgentByAgentId(reqCompany.SRCC_SalesAccount_ST.SaleAccId), "SaleAccId", "SaleAccount");
                }

                if (reqCompany.SMSA_Organization_ST.OrgType == "G" && reqCompany.SMSA_Organization_ST.UserName == "Org" + reqCompany.UserName)
                {
                    ViewBag.POrgId = new SelectList(dbUser.GetAllOrganizationByType("N"), "OrgID", "Description");
                    ViewBag.OrgType = new SelectList(new List<Object>
                    {
                        new {value = "G", text = "Group of Companies"},
                        new {value = "C", text = "Company"},

                    }, "value", "text","G");
                }
                else if (reqCompany.SMSA_Organization_ST.OrgType == "C" && reqCompany.SMSA_Organization_ST.UserName == "Org" + reqCompany.UserName)
                {
                    ViewBag.POrgId = new SelectList(tempComp.SubAgentId > 0 ? dbUser.GetAllOrganizationBySaleAgentId(tempComp.SubAgentId) : tempComp.AgentId > 0 ? dbUser.GetAllOrganizationBySaleAgentId(tempComp.AgentId) : dbUser.GetAllOrganizationByType("G"), "OrgID", "Description");
                    ViewBag.OrgType = new SelectList(new List<Object>
                    {
                        new {value = "G", text = "Group of Companies"},
                        new {value = "C", text = "Company"},

                    }, "value", "text","C");
                }
                else
                {
                    
                    ViewBag.POrgId = new SelectList(tempComp.SubAgentId > 0 ? dbUser.GetAllOrganizationBySaleAgentId(tempComp.SubAgentId) : tempComp.AgentId > 0 ? dbUser.GetAllOrganizationBySaleAgentId(tempComp.AgentId) : dbUser.GetAllOrganizationByType("G"), "OrgID", "Description", reqCompany.OrgID);
                    ViewBag.OrgType = new SelectList(new List<Object>
                    {
                        new {value = "G", text = "Group of Companies"},
                        new {value = "C", text = "Company"},

                    }, "value", "text", "C");
                }


                tempComp.Activity = reqCompany.Activity;
                tempComp.Address = reqCompany.Address;
                tempComp.Area = reqCompany.Area;
                tempComp.CityID = reqCompany.CityID;
                tempComp.CompanyID = reqCompany.CompanyID;
                tempComp.CompanyIDSpecified = reqCompany.CompanyIDSpecified;
                tempComp.CompanyName = reqCompany.CompanyName;
                tempComp.ContactPerson = reqCompany.ContactPerson;
                tempComp.CreatedBy = reqCompany.CreatedBy;
                tempComp.CreatedBySpecified = reqCompany.CreatedBySpecified;
                tempComp.CreatedOn = reqCompany.CreatedOn;
                tempComp.CreatedOnSpecified = reqCompany.CreatedOnSpecified;
                tempComp.Email = reqCompany.Email;
                tempComp.EstID = reqCompany.EstID;
                tempComp.IsActive = reqCompany.IsActive;
                tempComp.IsApproved = reqCompany.IsApproved;
                tempComp.logoPath = reqCompany.logoPath;
                tempComp.Mobile = reqCompany.Mobile;
                tempComp.ModifyBy = reqCompany.ModifyBy;
                tempComp.ModifyBySpecified = reqCompany.ModifyBySpecified;
                tempComp.ModifyOn = reqCompany.ModifyOn;
                tempComp.ModifyOnSpecified = reqCompany.ModifyOnSpecified;
                tempComp.OrgID = reqCompany.OrgID;
                tempComp.POrgId = reqCompany.OrgID;
                tempComp.OrgIDSpecified = reqCompany.OrgIDSpecified;
                tempComp.OrgType = OrgType;
                tempComp.Phone = reqCompany.Phone;
                tempComp.POrgId = reqCompany.OrgID;
                tempComp.SaleAccId = reqCompany.SaleAccId;
                tempComp.SaleAccIdSpecified = reqCompany.SaleAccIdSpecified;
                tempComp.Terms = reqCompany.Terms;
                tempComp.TotalEmp = reqCompany.TotalEmp;
                tempComp.TotalEmpSpecified = reqCompany.TotalEmpSpecified;
                tempComp.UserName = reqCompany.UserName;
                tempComp.VerifyEmail = reqCompany.VerifyEmail;


                return View(tempComp);

            }
            return View();
        }

        [HttpPost]
        [Decrypted]
        public ActionResult Company(int? user, int? OrgId, int? CompanyId, CompanyDetail tt)
        {
            try
            {
                if (tt.CompanyID > 0)
                {
                    SMSA_CompanyMst_ST Comp = dbUser.GetCompanyById(tt.CompanyID);

                    #region Organization for each company
                    if (tt.POrgId.HasValue && tt.POrgId > 0)
                    {
                        #region Organization
                        SMSA_Organization_ST reqCompOrg = dbUser.GetOrganizationById(tt.OrgID);
                        reqCompOrg.OrgType = tt.OrgType;
                        reqCompOrg.SaleAccId = tt.SaleAccId;
                        reqCompOrg.SaleAccIdSpecified = true;
                        reqCompOrg.Description = reqCompOrg.UserName == "Org" + Comp.UserName ? tt.CompanyName : reqCompOrg.Description;
                        dbUser.UpdateOrganization(reqCompOrg);
                        Comp.OrgID = tt.POrgId.Value;
                        Comp.OrgIDSpecified = true;
                        #endregion
                    }
                    else
                    {
                        var lstOrg = dbUser.GetAllOrganization();
                        var reqOrgDefault = lstOrg.Where(x => x.UserName == "Org" + tt.UserName).FirstOrDefault();
                        if (reqOrgDefault != null)
                        {
                            #region Organization
                            SMSA_Organization_ST reqCompOrg = dbUser.GetOrganizationById(reqOrgDefault.OrgID);
                            reqCompOrg.OrgType = tt.OrgType;
                            reqCompOrg.SaleAccId = tt.SaleAccId;
                            reqCompOrg.SaleAccIdSpecified = true;
                            reqCompOrg.Description = reqCompOrg.UserName == "Org" + Comp.UserName ? tt.CompanyName : reqCompOrg.Description;
                            dbUser.UpdateOrganization(reqCompOrg);
                            Comp.OrgID = reqOrgDefault.OrgID;
                            Comp.OrgIDSpecified = true;
                            #endregion
                        }
                        else
                        {
                            SMSA_Organization_ST org = new WPSService.SMSA_Organization_ST();
                            org.OrgType = tt.OrgType;
                            org.SaleAccId = tt.SubAgentId > 0 ? tt.SubAgentId : tt.AgentId > 0 ? tt.AgentId : org.SaleAccId;
                            org.SaleAccIdSpecified = true;
                            org.Status = "A";
                            org.UserName = "Org" + tt.UserName;
                            org.CreatedBy = user;
                            org.CreatedBySpecified = true;
                            org.CreatedOn = DateTime.Now;
                            org.CreatedOnSpecified = true;
                            org.Description = tt.CompanyName;
                            tt.POrgId = dbUser.InsertOrganization(org);
                            Comp.OrgID = tt.POrgId.Value;
                            Comp.OrgIDSpecified = true;
                            if (Membership.GetUser(org.UserName) == null)
                            {
                                MembershipCreateStatus status;
                                // Generate a new 12-character password with 1 non-alphanumeric character.
                                //y0t(9ci&xUn^
                                string password = org.UserName + "123";// utility.GetUniqueKey(8);//Membership.GeneratePassword(8, 0);
                                                                          // string password = "123456";

                                MembershipUser newUser = Membership.CreateUser(org.UserName, password, org.UserName, "ok", "ok", true, out status);
                                UserServiceClass.SMIM_UserMst_ST User = new UserServiceClass.SMIM_UserMst_ST();
                                User.UserId = 0; User.UserName = org.UserName; User.Email = tt.Email;
                                User.FirstName = tt.ContactPerson; User.OrgId = tt.POrgId.Value;

                                utility.IsSpecifed<UserServiceClass.SMIM_UserMst_ST>(User);
                                int maxValue = db.InsertUser(User);
                            }
                        }
                    }
                    #endregion

                    #region Company
                   
                   
                   Comp.SMSA_Organization_ST = null;
                    
                    Comp.Address = tt.Address;
                    Comp.CompanyName = tt.CompanyName;
                    Comp.ContactPerson = tt.ContactPerson;
                    Comp.Email = tt.Email;
                    Comp.EstID = tt.EstID;
                    Comp.IsActive = "Y";
                    Comp.IsApproved = "Y";
                    Comp.logoPath = tt.logoPath;
                    Comp.Mobile = tt.Mobile;
                    Comp.Phone = tt.Phone;
                    Comp.SaleAccIdSpecified = true;
                    if (tt.SubAgentId > 0)
                        Comp.SaleAccId = tt.SubAgentId;
                    else if (tt.AgentId > 0)
                        Comp.SaleAccId = tt.AgentId;
                    else
                        Comp.SaleAccId = null; 
                    
                    Comp.ModifyBy = user;
                    Comp.ModifyBySpecified = true;
                    Comp.ModifyOn = DateTime.Now;
                    Comp.ModifyOnSpecified = true;
                    dbUser.UpdateCompany(Comp);
                    #endregion

                    #region Activity Log
                    SMSA_Logs_HI log = new SMSA_Logs_HI();
                    utility.IsSpecifed<SMSA_Logs_HI>(log);
                    log.ActivityBy = user.Value;
                    log.ActivityDesc = "Edit Company Details";
                    log.ActivityOn = DateTime.Now;
                    log.ActivityType = "U";
                    log.ColumnId = tt.CompanyID;
                    dbUser.AddActivityLog(log);
                    #endregion
                    //#region Organization
                    //SMSA_Organization_ST reqOrg = dbUser.GetOrganizationById(tt.OrgID);
                    //reqOrg.OrgType = tt.OrgType;
                    //reqOrg.SaleAccId = tt.SaleAccId;
                    //reqOrg.SaleAccIdSpecified = true;
                    //reqOrg.Description = reqOrg.UserName == "Org" + Comp.UserName ? tt.CompanyName : reqOrg.Description;
                    //dbUser.UpdateOrganization(reqOrg);
                    //#endregion

                    return Json(new { success = true, response = "Company updated successfully." });
                }
                else
                {
                    #region Organization for each company
                    if (tt.POrgId.HasValue && tt.POrgId > 0)
                    {
                        /*Organization laready defined and this company is part of group of companies*/
                    }
                    else
                    {
                        SMSA_Organization_ST org = new WPSService.SMSA_Organization_ST();
                        org.OrgType = tt.OrgType;
                        org.SaleAccId = tt.SubAgentId > 0 ? tt.SubAgentId : tt.AgentId > 0 ? tt.AgentId : org.SaleAccId;
                        org.SaleAccIdSpecified = true;
                        org.Status = "A";
                        org.UserName = "Org" + tt.UserName;
                        org.CreatedBy = user;
                        org.CreatedBySpecified = true;
                        org.CreatedOn = DateTime.Now;
                        org.CreatedOnSpecified = true;
                        org.Description = tt.CompanyName;
                        tt.POrgId = dbUser.InsertOrganization(org);

                        if (Membership.GetUser(org.UserName) == null)
                        {
                            MembershipCreateStatus status;
                            // Generate a new 12-character password with 1 non-alphanumeric character.
                            //y0t(9ci&xUn^
                            string password = org.UserName + "123"; //utility.GetUniqueKey(8);//Membership.GeneratePassword(8, 0);
                                                                      // string password = "123456";

                            MembershipUser newUser = Membership.CreateUser(org.UserName, password, org.UserName, "ok", "ok", true, out status);
                            UserServiceClass.SMIM_UserMst_ST User = new UserServiceClass.SMIM_UserMst_ST();
                            User.UserId = 0; User.UserName = org.UserName; User.Email = tt.Email;
                            User.FirstName = tt.ContactPerson; User.OrgId = tt.POrgId.Value;

                            utility.IsSpecifed<UserServiceClass.SMIM_UserMst_ST>(User);
                            int maxValue = db.InsertUser(User);
                        }
                    }
                    #endregion

                    #region Company Insertion
                    
                    SMSA_CompanyMst_ST Comp = new SMSA_CompanyMst_ST();
                    Comp.OrgID = tt.POrgId.Value;
                    Comp.OrgIDSpecified = true;
                    Comp.Address = tt.Address;
                    Comp.CompanyName = tt.CompanyName;
                    Comp.ContactPerson = tt.ContactPerson;
                    Comp.CreatedBy = user;
                    Comp.CreatedBySpecified = true;
                    Comp.CreatedOn = DateTime.Now;
                    Comp.CreatedOnSpecified = true;
                    Comp.Email = tt.Email;
                    Comp.EstID = tt.EstID;
                    Comp.IsActive = "Y";
                    Comp.IsApproved = "Y";
                    Comp.logoPath = tt.logoPath;
                    Comp.Mobile = tt.Mobile;
                    Comp.Phone = tt.Phone;
                    Comp.SaleAccId = tt.SubAgentId > 0 ? tt.SubAgentId : tt.AgentId > 0 ? tt.AgentId : Comp.SaleAccId;
                    Comp.SaleAccIdSpecified = true;
                    Comp.UserName = tt.UserName;
                    int rtn = dbUser.InsertCompany(Comp);

                    #region Activity Log
                    SMSA_Logs_HI log = new SMSA_Logs_HI();
                    utility.IsSpecifed<SMSA_Logs_HI>(log);
                    log.ActivityBy = user.Value;
                    log.ActivityDesc = "Add New Company";
                    log.ActivityOn = DateTime.Now;
                    log.ActivityType = "I";
                    log.ColumnId = rtn;
                    dbUser.AddActivityLog(log);
                    #endregion

                    if (rtn > 0)
                    {
                        if (Membership.GetUser(tt.UserName) == null)
                        {
                            MembershipCreateStatus status;
                            // Generate a new 12-character password with 1 non-alphanumeric character.
                            //y0t(9ci&xUn^
                            string password = tt.UserName + "123"; //utility.GetUniqueKey(8);//Membership.GeneratePassword(8, 0);
                                                                    // string password = "123456";

                            MembershipUser newUser = Membership.CreateUser(tt.UserName, password, tt.UserName, "ok", "ok", true, out status);
                            UserServiceClass.SMIM_UserMst_ST User = new UserServiceClass.SMIM_UserMst_ST();
                            User.UserId = 0; User.UserName = tt.UserName; User.Email = tt.Email;
                            User.FirstName = tt.ContactPerson; User.OrgId = tt.POrgId.Value; User.CompanyId = rtn;

                            utility.IsSpecifed<UserServiceClass.SMIM_UserMst_ST>(User);
                            int maxValue = db.InsertUser(User);
                        }
                        return Json(new { success = true, response = "Company registered successfully." });
                    }
                    else if (rtn == 0)
                    {
                        return Json(new { success = false, response = "Company already registered." });
                    }
                    #endregion
                    
                }
            }
            catch (Exception)
            {

                throw;
            }
            var req = tt;
            return View(tt);
        }

        public ActionResult AddCompany(int? user, int? OrgId, int? CompanyId)
        {
            //if (Request.UrlReferrer == null || Request.UrlReferrer.Segments[Request.UrlReferrer.Segments.Length - 1] == "")
            //    return RedirectToAction("Login", "Login");

            return View();
        }

        [Decrypted]
        public ActionResult GetPendingCRM(int? user, int? OrgId, int? CompanyId)
        {
            
            //if (Request.UrlReferrer == null || Request.UrlReferrer.Segments[Request.UrlReferrer.Segments.Length - 1] == "")
            //    return RedirectToAction("Login", "Login");
            string username = "wetekapi";
            string password = "wetekAdmin123";
            APIModel.LoginTokenResult accessToken = APIModel.GetLoginToken(username, password);
            if (accessToken.AccessToken != null)
            {
                //Console.WriteLine(accessToken);
                APIModel.JsonCompanySerlization list = APIModel.GetPendingCompany(accessToken.AccessToken);
                return Json(new { success = true, Company = list.data }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Console.WriteLine("Error Occurred:{0}, {1}", accessToken.Error, accessToken.ErrorDescription);
            }

            return View();
        }

        APIModel.JsonCompanySerlization CallAPI()
        {
            string username = "wetekapi";
            string password = "wetekAdmin123";
            APIModel.LoginTokenResult accessToken = APIModel.GetLoginToken(username, password);
            if (accessToken.AccessToken != null)
            {
                //Console.WriteLine(accessToken);
                APIModel.JsonCompanySerlization list = APIModel.GetPendingCompany(accessToken.AccessToken);
                return list;
            }
            else
            {
                return null;// "Error Occurred:{0}, {1}", accessToken.Error, accessToken.ErrorDescription;
                //Console.WriteLine("Error Occurred:{0}, {1}", accessToken.Error, accessToken.ErrorDescription);
            }
        }
        //[HttpPost]
        //[Decrypted]
        //public ActionResult ApproveCRM(int? user, int? OrgId, int? CompanyId, int[] Ids)
        //{
        //    try
        //    {
        //        var salesAccount = dbUser.GetAllSaleAccount();
        //        #region Cmommit
        //        string molNo, licNo, contactNo, email, agent, account, wpsUserId, ErrorMessage;
        //        int id; bool HrnAccounting, wpsLogin;
        //        Log.LogWrite("Start validating the companies....", "API Company Approval By " + user.Value.ToString(), null);
        //        List<uploadCompany> errorEmployees = new List<uploadCompany>();
        //        List<uploadCompany> uploademployees = new List<uploadCompany>();
        //        var reqPending = CallAPI().data.Where(x => Ids.Contains(x.id)).ToList();
        //        foreach (var item in reqPending)
        //        {
        //            id = item.id;
        //            molNo = item.molNo == null ? "" : item.molNo;
        //            licNo = item.licNo == null ? "" : item.licNo;
        //            contactNo = item.contactNo == null ? "" : item.contactNo;
        //            email = item.email == null ? "" : item.email;
        //            agent = item.agent == null ? "" : item.agent;
        //            account = item.account == null ? "" : item.account;
        //            HrnAccounting = item.wpsLogin == null ? false : item.hRnAccounting;
        //            wpsLogin = item.wpsLogin == null ? false : item.wpsLogin;
        //            wpsUserId = item.wpsUserId == null ? "" : item.wpsUserId;/**/
                   

        //            Log.LogWrite("Start checking.... Id: " + id + " | MOL No: " + molNo + " | Lic No: " + licNo + " | Agent :" + agent, "API Company Approval By " + user.Value.ToString(), null);
        //            #region Check Validation
        //            var reqAgent = salesAccount.Where(x => x.SaleAccount == agent).FirstOrDefault();
        //            var reqSubAgent = new SRCC_SalesAccount_ST();

        //            if (reqAgent == null)
        //            {
        //                //Create Agent here
        //            }
        //            else if (reqAgent != null && reqAgent.AccountType == "S")
        //            {
        //                reqSubAgent = reqAgent;
        //                reqAgent = salesAccount.Where(x => x.SaleAccId == reqAgent.ParentSaleId).FirstOrDefault();
        //            }
                    
        //            var reqParentCompany = ParentCompany == "" ? null : dbUser.GetAllCompanies().Where(x => x.EstID == ParentCompany).FirstOrDefault();
        //            var reqCompany = new SMSA_CompanyMst_ST();

        //            if (reqAgent != null && reqSubAgent != null && ParentCompany != "")
        //            {
        //                reqParentCompany = dbUser.GetAllCompanies().Where(x => x.EstID == ParentCompany && x.SaleAccId == reqSubAgent.SaleAccId).FirstOrDefault();
        //            }
        //            else if (reqAgent != null && reqSubAgent == null && ParentCompany != "")
        //            {
        //                reqParentCompany = dbUser.GetAllCompanies().Where(x => x.EstID == ParentCompany && x.SaleAccId == reqAgent.SaleAccId).FirstOrDefault();
        //            }

        //            if (reqAgent != null && reqSubAgent != null)
        //            {
        //                reqCompany = dbUser.GetAllCompanies().Where(x => x.EstID == EstID && x.SaleAccId == reqSubAgent.SaleAccId).FirstOrDefault();
        //            }
        //            else if (reqAgent != null && reqSubAgent == null)
        //            {
        //                reqCompany = dbUser.GetAllCompanies().Where(x => x.EstID == EstID && x.SaleAccId == reqAgent.SaleAccId).FirstOrDefault();
        //            }
        //            else
        //            {
        //                reqCompany = dbUser.GetAllCompanies().Where(x => x.EstID == EstID).FirstOrDefault();
        //            }


        //            if (reqCompany != null && reqCompany.EstID != "")
        //            {
        //                dbUser.UpdateTempCompany(item.TempCompanyId);
        //                errorEmployees.Add(new uploadCompany { AgentCode = Agent, SubAgentCode = SubAgent, ParentCompanyEstID = ParentCompany, CompanyName = CompanyName, EstID = EstID, ErrorMessage = "Company already exists." });
        //                Log.LogWrite("Company already exists for " + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //            }
        //            else if (reqAgent == null && Agent != "")
        //            {
        //                errorEmployees.Add(new uploadCompany { AgentCode = Agent, SubAgentCode = SubAgent, ParentCompanyEstID = ParentCompany, CompanyName = CompanyName, EstID = EstID, ErrorMessage = "Agent not exists. Please add agent and approve again" });
        //                Log.LogWrite("Invalid Agent for " + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //            }
        //            else if (reqSubAgent == null && SubAgent != "")
        //            {
        //                errorEmployees.Add(new uploadCompany { AgentCode = Agent, SubAgentCode = SubAgent, ParentCompanyEstID = ParentCompany, CompanyName = CompanyName, EstID = EstID, ErrorMessage = "Sub Agent not exists. Please add sub agent and approve again." });
        //                Log.LogWrite("Invalid Sub Agent for " + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //            }
        //            else if (reqParentCompany == null && ParentCompany != "")
        //            {
        //                errorEmployees.Add(new uploadCompany { AgentCode = Agent, SubAgentCode = SubAgent, ParentCompanyEstID = ParentCompany, CompanyName = CompanyName, EstID = EstID, ErrorMessage = "Group of Company not exists. Please check Agent, Sub Agent and Group of Company." });
        //                Log.LogWrite("Invalid Parent Company for " + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //            }
        //            else if (reqAgent != null && dbUser.checkDuplicateCompanyByAgent(reqAgent.SaleAccId, EstID, "A") == 0)
        //            {
        //                errorEmployees.Add(new uploadCompany { AgentCode = Agent, SubAgentCode = SubAgent, ParentCompanyEstID = ParentCompany, CompanyName = CompanyName, EstID = EstID, ErrorMessage = "Company already exists." });
        //                Log.LogWrite("Company already exists in Agent: " + Agent + " | " + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //            }
        //            else
        //            {

        //                int POrgId = 0;
        //                #region Organization for each company
        //                if (reqParentCompany != null && reqParentCompany.OrgID > 0)
        //                {
        //                    POrgId = reqParentCompany.OrgID;
        //                    /*Organization laready defined and this company is part of group of companies*/
        //                }
        //                else
        //                {
        //                    SMSA_Organization_ST org = new WPSService.SMSA_Organization_ST();
        //                    org.OrgType = CompanyType;
        //                    org.SaleAccId = reqSubAgent != null ? reqSubAgent.SaleAccId : reqAgent != null ? reqAgent.SaleAccId : org.SaleAccId;
        //                    org.SaleAccIdSpecified = true;
        //                    org.Status = "A";
        //                    org.UserName = "Org" + item.UserName;
        //                    org.CreatedBy = user;
        //                    org.CreatedBySpecified = true;
        //                    org.CreatedOn = DateTime.Now;
        //                    org.CreatedOnSpecified = true;
        //                    org.Description = item.CompanyName;
        //                    POrgId = dbUser.InsertOrganization(org);

        //                    if (Membership.GetUser(org.UserName) == null)
        //                    {
        //                        MembershipCreateStatus status;
        //                        // Generate a new 12-character password with 1 non-alphanumeric character.
        //                        //y0t(9ci&xUn^
        //                        string password = utility.GetUniqueKey(8);//Membership.GeneratePassword(8, 0);
        //                                                                  // string password = "123456";

        //                        MembershipUser newUser = Membership.CreateUser(org.UserName, password, org.UserName, "ok", "ok", true, out status);
        //                    }
        //                }
        //                #endregion

        //                #region Company Insertion

        //                SMSA_CompanyMst_ST Comp = new SMSA_CompanyMst_ST();
        //                Comp.OrgID = POrgId;
        //                Comp.OrgIDSpecified = true;
        //                Comp.Address = item.Address;
        //                Comp.CompanyName = item.CompanyName;
        //                Comp.ContactPerson = item.ContactPerson;
        //                Comp.CreatedBy = user;
        //                Comp.CreatedBySpecified = true;
        //                Comp.CreatedOn = DateTime.Now;
        //                Comp.CreatedOnSpecified = true;
        //                Comp.Email = item.Email;
        //                Comp.EstID = EstID;
        //                Comp.IsActive = "Y";
        //                Comp.IsApproved = "Y";
        //                Comp.Mobile = item.Mobile;
        //                Comp.Phone = item.Phone;
        //                Comp.SaleAccId = reqSubAgent != null ? reqSubAgent.SaleAccId : reqAgent != null ? reqAgent.SaleAccId : Comp.SaleAccId;
        //                Comp.SaleAccIdSpecified = true;
        //                Comp.UserName = item.UserName;
        //                int rtn = dbUser.InsertCompany(Comp);

        //                #region Activity Log
        //                SMSA_Logs_HI log = new SMSA_Logs_HI();
        //                utility.IsSpecifed<SMSA_Logs_HI>(log);
        //                log.ActivityBy = user.Value;
        //                log.ActivityDesc = "Approve Company";
        //                log.ActivityOn = DateTime.Now;
        //                log.ActivityType = "I";
        //                log.ColumnId = rtn;
        //                dbUser.AddActivityLog(log);
        //                #endregion
        //                uploademployees.Add(new uploadCompany { AgentCode = Agent, SubAgentCode = SubAgent, ParentCompanyEstID = ParentCompany, CompanyName = CompanyName, CompanyType = CompanyType, EstID = EstID, Email = Email, ErrorMessage = "" });
        //                #endregion

        //                dbUser.UpdateTempCompany(item.TempCompanyId);
        //                if (Membership.GetUser(item.UserName) == null)
        //                {
        //                    MembershipCreateStatus status;
        //                    // Generate a new 12-character password with 1 non-alphanumeric character.
        //                    //y0t(9ci&xUn^
        //                    string password = utility.GetUniqueKey(8);//Membership.GeneratePassword(8, 0);
        //                                                              // string password = "123456";

        //                    MembershipUser newUser = Membership.CreateUser(item.UserName, password, item.UserName, "ok", "ok", true, out status);
        //                }
        //                Log.LogWrite("Successfully validate company details : " + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //            }

        //            #endregion
        //            Log.LogWrite("End checking...." + EstID + " | " + CompanyName + " | " + Email, "Company Upload By " + user.Value.ToString(), null);
        //        }
        //        var resp = dbUser.GetAllPendingCompanies().Select(x => new uploadCompany { TempId = x.TempCompanyId, Address = x.Address, AgentCode = x.AgentCode, CompanyName = x.CompanyName, CompanyType = x.CompanyType, ContactPerson = x.ContactPerson, Email = x.Email, EstID = x.EstID, Mobile = x.Mobile, ParentCompanyEstID = x.ParentCompanyEstID, Phone = x.Phone, SubAgentCode = x.SubAgentCode, UserName = x.UserName }).ToList();

        //        #endregion
        //        return Json(new { success = true, Employees = resp, ErrorEmployees = errorEmployees }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Get stack trace for the exception with source file information
        //        var st = new System.Diagnostics.StackTrace(ex, true);
        //        // Get the top stack frame
        //        var frame = st.GetFrame(0);
        //        // Get the line number from the stack frame
        //        var line = frame.GetFileLineNumber();

        //        Log.LogWrite(line.ToString(), "User Id-" + user.Value.ToString() + "-" + "Upload Company(s)", ex);
        //        //Log.LogWrite(ex.Message, "User Id-" + user.Value.ToString() + "-" + "Deduction", ex);
        //        return Json(new { success = false, response = "Access denied. Please contact your administrator." }, JsonRequestBehavior.AllowGet);
        //    }
        //}
    }
}