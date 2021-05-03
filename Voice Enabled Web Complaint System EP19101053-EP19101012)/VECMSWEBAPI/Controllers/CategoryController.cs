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
    public class CategoryController : BaseController
    {
        
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        [ActionName("GetCategoryData")]
        public async Task<IActionResult> GetCategoryData()
        {
            var data = await _categoryService.GetCategoryData();
            return Ok(data);
        }


        [ActionName("SubmitCategory")]
        [HttpPost]
        public async Task<IActionResult> SubmitCategory(Category obj)
        {
         var data=   await _categoryService.SaveCategory(obj);

            return Ok(data);

        }
        [HttpGet]
        [ActionName("DeleteCategoryData")]
        public async Task<IActionResult> DeleteCategoryData(long Id)
        {
            var data = await _categoryService.DeleteCategoryData(Id);
            return Ok(data);
        }
    }
}
