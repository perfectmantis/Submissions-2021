using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using ApplicationService.Model;


namespace ApplicationService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class User : IUser
    {
        private UserModelEntities db = new UserModelEntities();
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

        #region User Type
        public List<SMIM_UserType_ST> GetAllUserType()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserType_ST.ToList();
        }

        public SMIM_UserType_ST GetAllUserTypeById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respUserType = db.SMIM_UserType_ST.FirstOrDefault(x => x.UserTypeId == id);
            return respUserType;
        }

        public int InsertUserType(SMIM_UserType_ST userType)
        {
            try
            {
                int maxUserTypeId = 0;
                if (db.SMIM_UserType_ST.Count() > 0)
                {
                    maxUserTypeId = db.SMIM_UserType_ST.Select(x => x.UserTypeId).Max();
                }
                maxUserTypeId = maxUserTypeId + 1;
                userType.UserTypeId = maxUserTypeId;
                db.SMIM_UserType_ST.Add(userType);
                db.SaveChanges();

                return maxUserTypeId;
            }
            catch (Exception ex)
            {
                    
                throw ex;
                //return 0;
            }
            
        }

        public void UpdateUserType(SMIM_UserType_ST userType)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(userType).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void DeleteUserType(SMIM_UserType_ST userType)
        {
            try
            {
                db.Entry(userType).State = EntityState.Deleted;
                db.SaveChanges();

                
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        #endregion

        #region Users
        public List<SMIM_UserMst_ST> GetAllUsers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserMst_ST.ToList();
        }

        public SMIM_UserMst_ST GetUserById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserMst_ST.FirstOrDefault(x => x.UserId == id);
        }

        public SMIM_UserMst_ST GetUserByUserName(string userName)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserMst_ST.FirstOrDefault(x => x.UserName == userName);
        }

        public List<SMIM_UserMst_ST> GetAllUsersByOrgId(int orgCode)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserMst_ST.Where(x => x.OrgId == orgCode).ToList();
        }

        public List<SMIM_UserMst_ST> GetAllUsersByCompanyId(int companyCode)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserMst_ST.Where(x => x.CompanyId == companyCode).ToList();
        }

        public List<SMIM_UserMst_ST> GetAllUsersBySalesAccountId(int salesAccountCode)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserMst_ST.Where(x => x.SACId == salesAccountCode).ToList();
        }

        public int InsertUser(SMIM_UserMst_ST user)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxUserId = 0;
                if (db.SMIM_UserMst_ST.Any())
                {
                    maxUserId = db.SMIM_UserMst_ST.Select(x => x.UserId).Max();
                }
                maxUserId = maxUserId + 1;
                user.UserId = maxUserId;
                db.SMIM_UserMst_ST.Add(user);
                db.SaveChanges();

                return maxUserId;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public int UpdateUser(SMIM_UserMst_ST user)
        {
            try
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();

                return user.UserId;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public int DeleteUser(SMIM_UserMst_ST user)
        {
            try
            {
                db.Entry(user).State = EntityState.Deleted;
                db.SaveChanges();

                return user.UserId;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }
        #endregion

        #region Roles
        public List<SMSA_Roles_ST> GetAllRoles()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_Roles_ST.ToList();
        }

        public List<SMSA_Roles_ST> GetAllRoleNameByRolesIds(string[] RoleIds)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMSA_Roles_ST.Where(x => RoleIds.Contains(x.RoleId.ToString())).ToList();
        }

        public int InsertRoles(SMSA_Roles_ST roles)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                roles.RoleId = db.aspnet_Roles.Where(x => x.RoleName == roles.RoleName).First().RoleId;
                db.SMSA_Roles_ST.Add(roles);
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }

        }

        public int UpdateRoles(SMSA_Roles_ST roles)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(roles).State = EntityState.Modified;
                db.SaveChanges();

                return Convert.ToInt32(roles.RoleId);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public int DeleteRoles(SMSA_Roles_ST roles)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(roles).State = EntityState.Deleted;
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public SMSA_Roles_ST GetAllRolesById(Guid id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respRoles = db.SMSA_Roles_ST.FirstOrDefault(x => x.RoleId == id);
            return respRoles;
        }

        #endregion

        #region Menu
        public List<SMAM_Menu_ST> GetAllMenu()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_Menu_ST.ToList();
        }

        public List<SMAM_Menu_ST> GetAllParentMenu()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_Menu_ST.Where(x => x.MenuType == "P").ToList();
        }

        public List<SMAM_Menu_ST> GetAllChildMenu()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_Menu_ST.Where(x => x.MenuType == "C").ToList();
        }

        public List<SMAM_Menu_ST> GetChildMenuByParentID(int ParentID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_Menu_ST.Where(x => x.ParentMenuId == ParentID).ToList();
        }

        public SMAM_Menu_ST GetAllMenuById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respMenu = db.SMAM_Menu_ST.FirstOrDefault(x => x.MenuId == id);
            return respMenu;
        }

        public int InsertMenu(SMAM_Menu_ST menu)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxMenuId = 0;
                if (db.SMAM_Menu_ST.Count() > 0)
                {
                    maxMenuId = db.SMAM_Menu_ST.Select(x => x.MenuId).Max();
                }
                maxMenuId = maxMenuId + 1;
                menu.MenuId = maxMenuId;
                db.SMAM_Menu_ST.Add(menu);
                db.SaveChanges();

                return maxMenuId;
            }
            catch (Exception ex)
            {
                throw ex;
                //return 0;
            }
        }

        public void UpdateMenu(SMAM_Menu_ST menu)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(menu).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
                // return 0;
            }
        }

        public void DeleteMenu(SMAM_Menu_ST menu)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(menu).State = EntityState.Deleted;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
                //return 0;
            }
        }
        #endregion

        #region User Type Access
        public List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccess()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserTypeAccess_ST.ToList();
        }

        public int InsertUserTypeAccess(SMIM_UserTypeAccess_ST UserTypeAccess)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxAccessId = 0;
                if (db.SMIM_UserTypeAccess_ST.Count() > 0)
                {
                    maxAccessId = db.SMIM_UserTypeAccess_ST.Select(x => x.AccessId).Max();
                }
                maxAccessId = maxAccessId + 1;
                UserTypeAccess.AccessId = maxAccessId;
                db.SMIM_UserTypeAccess_ST.Add(UserTypeAccess);
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }

        }

        public int UpdateUserTypeAccess(SMIM_UserTypeAccess_ST UserTypeAccess)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(UserTypeAccess).State = EntityState.Modified;
                db.SaveChanges();

                return Convert.ToInt32(UserTypeAccess.UserTypeId);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public int DeleteUserTypeAccess(SMIM_UserTypeAccess_ST UserTypeAccess)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                db.Entry(UserTypeAccess).State = EntityState.Deleted;
                db.SaveChanges();

                return Convert.ToInt32(UserTypeAccess.UserTypeId);
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessById(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respUserTypeId = db.SMIM_UserTypeAccess_ST.Where(x => x.UserTypeId == id).ToList();
            return respUserTypeId;
        }

        public List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessByIdAndRoles(int TypeId, Guid roleId)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respUserTypeId = db.SMIM_UserTypeAccess_ST.Where(x => x.UserTypeId == TypeId && x.RoleId == roleId).ToList();
            return respUserTypeId;
        }

        public List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessByIdAndRoleName(int TypeId, string RoleName)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respUserTypeId = db.SMIM_UserTypeAccess_ST.Where(x => x.UserTypeId == TypeId && x.Description == RoleName).ToList();
            return respUserTypeId;
        }

        public List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessByAssignedUserTypes(int[] UserTypeIds)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var respUserTypeId = db.SMIM_UserTypeAccess_ST.Where(x => UserTypeIds.Contains(x.UserTypeId.Value)).ToList();
            return respUserTypeId;
        }
        #endregion

        #region User Access
        public List<SMIM_UserAccess_ST> GetAllUserAccessByUserId(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMIM_UserAccess_ST.Where(x => x.UserId == id).ToList();
        }

        public int InsertUserAccess(SMIM_UserAccess_ST UserAccess)
        {
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int maxAccessId = 0;
                if (db.SMIM_UserAccess_ST.Count() > 0)
                {
                    maxAccessId = db.SMIM_UserAccess_ST.Select(x => x.CoAccId).Max();
                }
                maxAccessId = maxAccessId + 1;
                UserAccess.CoAccId = maxAccessId;
                db.SMIM_UserAccess_ST.Add(UserAccess);
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw ex;
                //return 0;
            }
        }

        public void UpdateUserAccess(SMIM_UserAccess_ST UserAccess)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(UserAccess).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void DeleteUserAccess(SMIM_UserAccess_ST UserAccess)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(UserAccess).State = EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region System Serives
        public List<SMAM_SystemService_ST> GetServices()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.SMAM_SystemService_ST.ToList();
        }
        #endregion
    }
}
