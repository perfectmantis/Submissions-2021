using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
namespace WebApiCoreProject.Services
{
    public class SubCategoryService : BLBase<SubCategory>, ISubCategoryService
    {
        

        public async Task<DTO> GetSubCategoryData()
        {
            //DataTable data = General.ExecuteADOSp("sp_GetSubCategory");
            var data = await SubCategory.ToListAsync();
          var subcatdata = await Category.ToListAsync();
            var lst = (from sa in data
                       select new
                       {
                           sa.CategoryId,
                           sa.SubCategoryName,
                           sa.Id,
                           CategoryName = subcatdata.Where(a=>a.Id == sa.CategoryId).FirstOrDefault().CategoryName
                       }).ToList();
            return SuccessResponse(lst);
        }

        public async Task<DTO> GetSubCategoryDataByCategory(long CategoryId)
        {
            
            var data = await SubCategory.Where(a=>a.CategoryId == CategoryId).ToListAsync();
            var subcatdata = await Category.ToListAsync();
            var lst = (from sa in data
                       select new
                       {
                           sa.CategoryId,
                           sa.SubCategoryName,
                           sa.Id,
                           CategoryName = subcatdata.Where(a => a.Id == sa.CategoryId).FirstOrDefault().CategoryName
                       }).ToList();
            return SuccessResponse(lst);
        }


        
        public async Task<DTO> SaveSubCategory(SubCategory subcategory)
        {
            try
            {
                Current = await SubCategory.Where(o => o.Id == subcategory.Id).FirstOrDefaultAsync();
                if (Current == null)
                    New();
                else
                    PrimaryKeyValue = Current.Id;

                Current.SubCategoryName = subcategory.SubCategoryName;
                Current.CategoryId = subcategory.CategoryId;


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

        public async Task<DTO> DeleteSubCategoryData(long Id)
        {
            try
            {
                Current = await SubCategory.Where(o => o.Id == Id).FirstOrDefaultAsync();
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
