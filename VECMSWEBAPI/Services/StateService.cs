using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;

namespace WebApiCoreProject.Services
{
    public class StateService : BLBase<State>, IStateService
    {
        //public DTO GetPatientData()
        //{
        //    var data = Patient.ToList();
        //    return SuccessResponse(data);
        //}


        public async Task<DTO> GetStateData()
        {
            var data = await State.ToListAsync();

            var lst = (from sa in data
                       select new
                       {
                           sa.Description,
                           sa.StateName
                           ,
                           sa.Id
                       }).ToList();
            //var data = await Patient.Include(a=>a.Relationships).ToListAsync();
            return SuccessResponse(lst);
        }

        protected override bool IsValidBeforeSave()
        {
            return ErrorList.Count == 0 ? true : false;
        }

        public async Task<DTO> SaveState(State state)
        {

            try
            {
                Current = await State.Where(o => o.Id == state.Id).FirstOrDefaultAsync();
                if (Current == null)
                    New();
                else
                    PrimaryKeyValue = Current.Id;

                Current.StateName = state.StateName;
                Current.Description = state.Description;
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

        public async Task<DTO> DeleteStateData(long Id)
        {
            try
            {
                Current = await State.Where(o => o.Id == Id).FirstOrDefaultAsync();
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


    }
}
