using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using ApplicationService.Model;

namespace ApplicationService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IUser
    {

        [OperationContract]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);

        #region Roles
        [OperationContract]
        List<SMSA_Roles_ST> GetAllRoles();

        [OperationContract]
        List<SMSA_Roles_ST> GetAllRoleNameByRolesIds(string[] RoleIds);

        [OperationContract]
        SMSA_Roles_ST GetAllRolesById(Guid id);

        [OperationContract]
        int InsertRoles(SMSA_Roles_ST roles);

        [OperationContract]
        int UpdateRoles(SMSA_Roles_ST roles);

        [OperationContract]
        int DeleteRoles(SMSA_Roles_ST roles);
        #endregion

        #region User Type
        [OperationContract]
        List<SMIM_UserType_ST> GetAllUserType();

        [OperationContract]
        SMIM_UserType_ST GetAllUserTypeById(int id);

        [OperationContract]
        int InsertUserType(SMIM_UserType_ST userType);

        [OperationContract]
        void UpdateUserType(SMIM_UserType_ST userType);

        [OperationContract]
        void DeleteUserType(SMIM_UserType_ST userType);
        #endregion

        #region Users
        [OperationContract]
        List<SMIM_UserMst_ST> GetAllUsers();

        [OperationContract]
        SMIM_UserMst_ST GetUserById(int id);

        [OperationContract]
        SMIM_UserMst_ST GetUserByUserName(string userName);

        [OperationContract]
        List<SMIM_UserMst_ST> GetAllUsersByOrgId(int orgCode);

        [OperationContract]
        List<SMIM_UserMst_ST> GetAllUsersByCompanyId(int companyCode);

        [OperationContract]
        List<SMIM_UserMst_ST> GetAllUsersBySalesAccountId(int salesAccountCode);

        [OperationContract]
        int InsertUser(SMIM_UserMst_ST user);

        [OperationContract]
        int UpdateUser(SMIM_UserMst_ST user);

        [OperationContract]
        int DeleteUser(SMIM_UserMst_ST user);
        #endregion

        #region Menu
        [OperationContract]
        List<SMAM_Menu_ST> GetAllMenu();

        [OperationContract]
        List<SMAM_Menu_ST> GetAllParentMenu();

        [OperationContract]
        List<SMAM_Menu_ST> GetAllChildMenu();

        [OperationContract]
        List<SMAM_Menu_ST> GetChildMenuByParentID(int ParentID);

        [OperationContract]
        SMAM_Menu_ST GetAllMenuById(int id);

        [OperationContract]
        int InsertMenu(SMAM_Menu_ST menu);

        [OperationContract]
        void UpdateMenu(SMAM_Menu_ST menu);

        [OperationContract]
        void DeleteMenu(SMAM_Menu_ST menu);
        #endregion

        #region UserTypeAccess
        [OperationContract]
        List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccess();

        [OperationContract]
        List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessByAssignedUserTypes(int[] UserTypeIds);

        [OperationContract]
        List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessById(int id);

        [OperationContract]
        int InsertUserTypeAccess(SMIM_UserTypeAccess_ST UserTypeAccess);

        [OperationContract]
        int UpdateUserTypeAccess(SMIM_UserTypeAccess_ST UserTypeAccess);

        [OperationContract]
        int DeleteUserTypeAccess(SMIM_UserTypeAccess_ST UserTypeAccess);

        [OperationContract]
        List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessByIdAndRoles(int Typeid, Guid roleId);

        [OperationContract]
        List<SMIM_UserTypeAccess_ST> GetAllUserTypeAccessByIdAndRoleName(int TypeId, string RoleName);
        #endregion

        #region UserAccess
        [OperationContract]
        List<SMIM_UserAccess_ST> GetAllUserAccessByUserId(int id);

        [OperationContract]
        int InsertUserAccess(SMIM_UserAccess_ST UserAccess);

        [OperationContract]
        void UpdateUserAccess(SMIM_UserAccess_ST UserAccess);

        [OperationContract]
        void DeleteUserAccess(SMIM_UserAccess_ST UserAccess);


        #endregion

        #region System Serives
        [OperationContract]
        List<SMAM_SystemService_ST> GetServices();
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
