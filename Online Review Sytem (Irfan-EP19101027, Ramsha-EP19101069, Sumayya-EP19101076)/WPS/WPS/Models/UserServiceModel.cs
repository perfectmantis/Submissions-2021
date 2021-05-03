using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WPS.UserServiceClass;

namespace WPS.Models
{
    public class UserServiceModel
    {
        UserServiceClass.User dbUser = new User();

        #region User Type
        public List<SMIM_UserType_ST> getUserTypes()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserType().ToList();
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

        public SMIM_UserType_ST getUserTypebyId(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserTypeById(id, true);
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

        public int InsertUserType(SMIM_UserType_ST userType)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = false;
                dbUser.InsertUserType(userType, out UserTypeId, out specified);
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

        public int UpdateUserType(SMIM_UserType_ST userType)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _UserTypeId;
                bool specified;
                userType.UserTypeIdSpecified = true;
                dbUser.UpdateUserType(userType);
                dbUser.Dispose();
                dbUser.Abort();
                return userType.UserTypeId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public int DeleteUserType(SMIM_UserType_ST userType)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = false;
                dbUser.DeleteUserType(userType);
                dbUser.Dispose();
                dbUser.Abort();
                return userType.UserTypeId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region Roles

        public List<SMSA_Roles_ST> getRoles()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllRoles().ToList();
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

        public List<SMSA_Roles_ST> getRolesbyRoleId(string[] RoleIds)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllRoleNameByRolesIds(RoleIds).ToList();
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

        public SMSA_Roles_ST getRolesbyId(Guid id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllRolesById(id.ToString());
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

        public int InsertRoles(SMSA_Roles_ST Roles)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = false;
                dbUser.InsertRoles(Roles, out UserTypeId, out specified);
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

        public int UpdateRoles(SMSA_Roles_ST Roles)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _Roles;
                bool specified = false;

                dbUser.UpdateRoles(Roles, out _Roles, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(Roles.RoleId);
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        public int DeleteRoles(SMSA_Roles_ST Roles)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int Roleid = 0;
                bool specified = false;
                dbUser.DeleteRoles(Roles, out Roleid, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return Convert.ToInt32(Roles.RoleId);
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        #endregion

        #region Menu
        public List<SMAM_Menu_ST> getMenuList()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllMenu().ToList();
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

        public List<SMAM_Menu_ST> getParentMenuList()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllParentMenu().ToList();
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

        public SMAM_Menu_ST getMenubyId(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllMenuById(id, true);
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

        public int InsertMenu(SMAM_Menu_ST Menu)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _menuId = 0;
                bool specified = true;
                dbUser.InsertMenu(Menu, out _menuId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return _menuId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public int UpdateMenu(SMAM_Menu_ST Menu)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                dbUser.UpdateMenu(Menu);
                dbUser.Dispose();
                dbUser.Abort();
                return Menu.MenuId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public int DeleteMenu(SMAM_Menu_ST Menu)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                dbUser.DeleteMenu(Menu);
                dbUser.Dispose();
                dbUser.Abort();
                return Menu.MenuId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region User Type Access
        public List<SMIM_UserTypeAccess_ST> getAccessByUserType(int UserTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserTypeAccessById(UserTypeID, true).ToList();
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

        public List<SMIM_UserTypeAccess_ST> getAccessByUserTypeByAssignedUserTypes(int[] UserTypeID)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserTypeAccessByAssignedUserTypes(UserTypeID).ToList();
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
        public List<SMIM_UserTypeAccess_ST> getAccessByUserTypeAndRoleId(int UserTypeID, Guid RoleId)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserTypeAccessByIdAndRoles(UserTypeID, true, RoleId.ToString()).ToList();
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

        public List<SMIM_UserTypeAccess_ST> getAccessByUserTypeAndRoleName(int UserTypeID, string RoleName)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserTypeAccessByIdAndRoleName(UserTypeID, true, RoleName).ToList();
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

        public void InsertUserTypeAccess(SMIM_UserTypeAccess_ST uTypeAccess)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = false;
                dbUser.InsertUserTypeAccess(uTypeAccess, out UserTypeId, out specified);
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

        public void DeleteUserTypeAccess(SMIM_UserTypeAccess_ST uTypeAccess)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = false;
                dbUser.DeleteUserTypeAccess(uTypeAccess, out UserTypeId, out specified);
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

        #region User
        public List<SMIM_UserMst_ST> GetAllUsers()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUsers().ToList();
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

        public SMIM_UserMst_ST GetUserById(int id)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetUserById(id, true);
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

        public SMIM_UserMst_ST GetUserByUserName(string userName)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetUserByUserName(userName);
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

        public int InsertUser(SMIM_UserMst_ST User)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _UserId = 0;
                bool specified = true;
                dbUser.InsertUser(User, out _UserId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return _UserId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public int UpdateUser(SMIM_UserMst_ST User)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _UserId;
                bool specified;
                User.UserIdSpecified = true;
                User.UserTypeIdSpecified = true;
                dbUser.UpdateUser(User, out _UserId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return _UserId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }

        public int DeleteUser(SMIM_UserMst_ST User)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int _UserId = 0;
                bool specified = false;
                dbUser.DeleteUser(User, out _UserId, out specified);
                dbUser.Dispose();
                dbUser.Abort();
                return _UserId;
            }
            catch (Exception ex)
            {
                dbUser.Dispose();
                dbUser.Abort();
                throw ex;
            }
        }
        #endregion

        #region User Access
        public List<SMIM_UserAccess_ST> getUserAccessByUserID(int UserId)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetAllUserAccessByUserId(UserId, true).ToList();
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

       public void InsertUserAccess(SMIM_UserAccess_ST userAccess)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                int UserTypeId = 0;
                bool specified = false;
                dbUser.InsertUserAccess(userAccess, out UserTypeId, out specified);
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

        public void UpdateUserAccess(SMIM_UserAccess_ST userAccess)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                dbUser.UpdateUserAccess(userAccess);
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
        public void DeleteUserAccess(SMIM_UserAccess_ST userAccess)
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                dbUser.DeleteUserAccess(userAccess);
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

        #region Serives
        public List<SMAM_SystemService_ST> GetServices()
        {
            try
            {
                dbUser.Timeout = System.Threading.Timeout.Infinite;
                var resp = dbUser.GetServices().ToList();
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

    public class TempAssignRole : SMIM_UserTypeAccess_ST
    {
        public List<SMSA_Roles_ST> TempRoles { get; set; }

        public int UserType { get; set; }
        //public int Roles { get; set; }
    }
}