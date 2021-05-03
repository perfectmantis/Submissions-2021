using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;

namespace WebApiCoreProject.Services
{
    public class LoginService : BLBase<UserRegistration>, ILoginService
    {
        public async Task<DTO> GetScreens(int UserTypeId)
        {
            try
            {
                IList<Screens> lst = null;

                lst = await Screens.Where(a => a.UserTypeId == UserTypeId).OrderBy(a=>a.Id).ToListAsync();

                return SuccessResponse(lst);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> GetUserVerification(string UserName, string Password)
        {
            try
            {
                List<string> Error = new List<string>();
                if (UserName != null && Password != null)
                {


                    var objUser = await UserRegistration.Where(sa => sa.FullName == UserName && sa.Password == Password).FirstOrDefaultAsync();
                    if (objUser != null)
                    {
                        return this.SuccessResponse(objUser);

                    }
                    else
                        return this.BadResponse("Invalid Username or Password.");
                }
                else
                {
                    if (UserName == null)
                        //return this.BadResponse("Required : UserName");
                        Error.Add("Required : Username");
                    if (Password == null)
                        //  return this.BadResponse("Required : Password");
                        Error.Add("Required : Password");
                }

                if (Error.Count > 0)
                    return this.BadResponse(Error);

                return this.SuccessResponse("");
            }
            catch (Exception Ex)
            {
                return this.BadResponse(Ex);
            }
        }


        protected override bool IsValidBeforeSave()
        {
            return ErrorList.Count == 0 ? true : false;
        }


    }
}
