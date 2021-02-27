using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Framework;

namespace WebApiCoreProject.Services
{
    public class UserRegistrationService : BLBase<UserRegistration>, IUserRegistrationService
    {

        public async Task<DTO> GetUserType()
        {

            var data = await UserType.ToListAsync();
            return SuccessResponse(data);
        }

        public async Task<DTO> GetUserRegistationData()
        {
            DataTable data = General.ExecuteADOSp("sp_GetUsers");
            //  var data = await UserRegistration.ToListAsync();
            return SuccessResponse(data);
        }
        public async Task<DTO> GetCompanyUsers()
        {
            DataTable data = General.ExecuteADOSp("sp_GetCompanyUsers");
            //  var data = await UserRegistration.ToListAsync();
            return SuccessResponse(data);
        }

        public async Task<DTO> GetUserRegistationDataById(long userid)
        {
            //  DataTable data = General.ExecuteADOSp("sp_GetCategory");
            var data = await UserRegistration.Where(sa => sa.Id == userid).FirstOrDefaultAsync();
            return SuccessResponse(data);
        }

        protected override bool IsValidBeforeSave()
        {
            return ErrorList.Count == 0 ? true : false;
        }

        public async Task<DTO> SaveProfile(UserRegistration user)
        {
            try
            {


                Current = await UserRegistration.Where(o => o.Id == user.Id).FirstOrDefaultAsync();
                if (Current == null)
                {
                    New();
                    Current.AddBy = user.AddBy.ToInt();
                    Current.UserTypeId = Enums.UserTypeId.Normal;
                    Current.IsApproved = false;
                }
                else
                {
                    PrimaryKeyValue = Current.Id;
                    Current.EditBy = user.EditBy.ToInt();
                }

                Current.FullName = user.FullName.ToStr();
                Current.Password = user.Password.ToStr();
                Current.Email = user.Email.ToStr();
                Current.ContactNo = user.ContactNo.ToStr();
                Current.Address = user.Address.ToStr();
                Current.PinCode = user.PinCode.ToStr();
                Current.CompanyName = user.CompanyName.ToStr();
                Current.StateId = user.StateId.ToInt();
                Current.ImageName = user.ImageName.ToStr();
                Current.ImagePath = user.ImagePath.ToStr();


                await Save();
                return SuccessResponse("Submit Successfully");
            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }

        }

        public async Task<DTO> SaveUserRegistration(UserRegistration user)
        {
            try
            {


                Current = await UserRegistration.Where(o => o.Id == user.Id).FirstOrDefaultAsync();
                if (Current == null)
                {
                    New();
                    Current.AddBy = user.AddBy.ToInt();

                }
                else
                {
                    PrimaryKeyValue = Current.Id;
                    Current.EditBy = user.AddBy.ToInt();
                }

                Current.FullName = user.FullName.ToStr();
                Current.Password = user.Password.ToStr();
                Current.Email = user.Email.ToStr();
                Current.ContactNo = user.ContactNo.ToStr();
                Current.Address = user.Address.ToStr();
                Current.PinCode = user.PinCode.ToStr();
                Current.CompanyName = user.CompanyName.ToStr();
                Current.StateId = user.StateId.ToInt();
                Current.UserTypeId = user.UserTypeId == null ? Enums.UserTypeId.Normal : user.UserTypeId.ToInt();
                Current.IsApproved = user.IsApproved.ToBool();




                string Body = "";

                Body += "Dear : " + Current.FullName.ToStr();
                Body += Environment.NewLine + Environment.NewLine + "We are pleased to inform you that your login has been successfully created at the Complaint Managment Web Portal.Following is you login" + Environment.NewLine + "info :" + Environment.NewLine + Environment.NewLine;
                Body += "Login : " + Current.FullName.ToStr() + Environment.NewLine;
                Body += "Password : " + Current.Password.ToStr() + Environment.NewLine + Environment.NewLine;
                Body += "Thanks and Regards," + Environment.NewLine;
                Body += "Team : FYP Group" + Environment.NewLine;


                if (General.SendEmail(Current.Email, Body,"User Credientials") == true)
                    await Save();
                return SuccessResponse("Submit Successfully");
            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }
        }
        public async Task<DTO> DeleteUserRegistrationData(long Id)
        {
            try
            {
                Current = await UserRegistration.Where(o => o.Id == Id).FirstOrDefaultAsync();
                if (Current != null)
                    PrimaryKeyValue = Current.Id;

                await Delete();
                return this.SuccessResponse("Deleted Successfully.");


            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> UpdateUserRegistration(long UserId, string OldPassword, string Password)
        {
            try
            {
                string CurrentPassword = string.Empty;
                Current = await UserRegistration.Where(o => o.Id == UserId).FirstOrDefaultAsync();
                if (Current != null)
                {
                    PrimaryKeyValue = Current.Id;
                    CurrentPassword = Current.Password;
                }

                if (OldPassword == CurrentPassword)
                {
                    Current.EditBy = UserId.ToInt();
                    Current.Password = Password.ToString();


                    await Save();

                    return this.SuccessResponse("Your password has been reset successfully!");
                }
                return this.BadResponse("Old password is invalid!");


            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }
        }



    }
}
