using Microsoft.AspNetCore.Http;
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
    public class StateController : Controller
    {
        private readonly IStateService _stateService;

        public StateController(IStateService stateService)
        {
            _stateService = stateService;
        }
        [HttpGet]
        [ActionName("GetStateData")]
        public async Task<IActionResult> GetStateData()
        {
            var data = await _stateService.GetStateData();
            return Ok(data);
        }

       // [HttpPost("api/{controller}/{action}")]
       [ActionName("SaveState")]
   
        public async Task<IActionResult> SaveState(State request)
        {
          var data =   await _stateService.SaveState(request);
            return Ok(data);
        }

        [HttpGet]
        [ActionName("DeleteStateData")]
        public async Task<IActionResult> DeleteStateData(long Id)
        {
            var data = await _stateService.DeleteStateData(Id);
            return Ok(data);
        }
        public class Data
        {
            public string Name { get; set; }
        }
    }
}
