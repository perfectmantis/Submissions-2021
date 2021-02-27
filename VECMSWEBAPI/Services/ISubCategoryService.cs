using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Models;
using WebApiCore_Base.Framework;
namespace WebApiCoreProject.Services

{
 public interface ISubCategoryService
    {
        Task<DTO> GetSubCategoryData();
        Task<DTO> GetSubCategoryDataByCategory(long CatergoryId);
        Task<DTO> DeleteSubCategoryData(long Id);
        Task<DTO> SaveSubCategory(SubCategory category);
    }
}
