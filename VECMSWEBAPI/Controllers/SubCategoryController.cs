using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Services;

namespace WebApiCoreProject.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SubCategoryController : BaseController
    {
        private readonly ISubCategoryService _subcategoryService;

        public SubCategoryController(ISubCategoryService subcategoryService)
        {
            _subcategoryService = subcategoryService;
        }
        [HttpGet]
        [ActionName("GetSubCategoryData")]
        public async Task<IActionResult> GetSubCategoryData()
        {
            var data = await _subcategoryService.GetSubCategoryData();
            return Ok(data);
        }
        [HttpGet]
        [ActionName("GetSubCategoryDataByCategory")]
        public async Task<IActionResult> GetSubCategoryDataByCategory(long CategoryId)
        {
            var data = await _subcategoryService.GetSubCategoryDataByCategory(CategoryId);
            return Ok(data);
        }

        [ActionName("SubmitSubCategory")]
        [HttpPost]
        public async Task<IActionResult> SubmitSubCategory(SubCategory obj)
        {
         var data=   await _subcategoryService.SaveSubCategory(obj);

            return Ok(data);

        }
        [HttpGet]
        [ActionName("DeleteSubCategoryData")]
        public async Task<IActionResult> DeleteSubCategoryData(long Id)
        {
            var data = await _subcategoryService.DeleteSubCategoryData(Id);
            return Ok(data);
        }
    }
}
