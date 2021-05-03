using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;

namespace WebApiCoreProject.Services
{
    public class CategoryService : BLBase<Category>, ICategoryService
    {



        public async Task<DTO> GetCategoryData()
        {
            //  DataTable data = General.ExecuteADOSp("sp_GetCategory");
            var data = await Category.ToListAsync();
            return SuccessResponse(data);
        }

        protected override bool IsValidBeforeSave()
        {
            return ErrorList.Count == 0 ? true : false;
        }

        public async Task<DTO> SaveCategory(Category category)
        {
            try
            {


                Current = await Category.Where(o => o.Id == category.Id).FirstOrDefaultAsync();
                if (Current == null)
                    New();
                else
                    PrimaryKeyValue = Current.Id;

                Current.CategoryName = category.CategoryName;
                Current.Description = category.Description;

                //foreach (var item in state.Relationships)
                //{
                //    var relationship = new Relationships();
                //    if (item.PkId > 0)
                //        relationship = Relationships.Where(o => o.PkId == item.PkId).FirstOrDefault();

                //    relationship.Name = item.Name;
                //    patient.Relationships.Add(relationship);
                //  }

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
        public async Task<DTO> DeleteCategoryData(long Id)
        {
            try
            {
                Current = await Category.Where(o => o.Id == Id).FirstOrDefaultAsync();
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
