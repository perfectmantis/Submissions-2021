using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;

namespace WebApiCoreProject.Services
{
    public interface ICategoryService
    {
       
        Task<DTO> GetCategoryData();
        Task<DTO> DeleteCategoryData(long Id);
        Task<DTO> SaveCategory(Category category);
    }
}
