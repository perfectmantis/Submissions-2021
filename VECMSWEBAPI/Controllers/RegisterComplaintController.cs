using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Services;

namespace WebApiCoreProject.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RegisterComplaintController : BaseController
    {
        private readonly IRegisterComplaintService _registercomplaintService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public RegisterComplaintController(IRegisterComplaintService registercomplaintService, IHostingEnvironment hostingEnvironment)
        {
            _registercomplaintService = registercomplaintService;
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        [ActionName("GetComplaintTypeData")]
        public async Task<IActionResult> GetComplaintTypeData()
        {
            var data = await _registercomplaintService.GetComplaintTypeData();
            return Ok(data);
        }
        [HttpGet]
        [ActionName("GetComplaintDataByUser")]
        public async Task<IActionResult> GetComplaintDataByUser(long UserId)
        {
            var data = await _registercomplaintService.GetComplaintDataByUser(UserId);
            return Ok(data);
        }

        [HttpGet]
        [ActionName("GetComplaintDataByStatus")]
        public async Task<IActionResult> GetComplaintDataByStatus(long StatusId, long? UserId)
        {
            var data = await _registercomplaintService.GetComplaintDataByStatus(StatusId, UserId);
            return Ok(data);
        }

        [HttpGet]
        [ActionName("GetComplaintDataById")]
        public async Task<IActionResult> GetComplaintDataById(long Id)
        {
            var data = await _registercomplaintService.GetComplaintDataById(Id);
            return Ok(data);
        }



        [ActionName("SubmitRegisterComplaint")]
        [HttpPost]
        public async Task<IActionResult> SubmitRegisterComplaint()
        {

            try

            {
                var httprequest = HttpContext.Request.Form;
                var obj = httprequest["obj"];


                //to read complete object which is coming as json form
                //dynamic RemData = JObject.Parse(obj);
                //string complaintWord = RemData.complaintWord;
                //end

                ComplaintRegistration comp = new ComplaintRegistration();
                string fileName = null;
                var postedfile = httprequest.Files["file"];
                comp.AddBy = httprequest["addBy"].ToInt();
                comp.CategoryId = httprequest["categoryId"].ToInt();
                comp.SubCategoryId = httprequest["subCategoryId"].ToInt();
                comp.ComplaintNature = httprequest["complaintNature"].ToStr();
                comp.StateId = httprequest["stateId"].ToInt();
                comp.ComplaintTypeId = httprequest["complaintTypeId"].ToInt();
                comp.ComplaintWord = httprequest["complaintWord"].ToStr();

                // Create Custom File Name
                string filePath = string.Empty;
                if (postedfile != null)
                {
                    fileName = new String(Path.GetFileNameWithoutExtension(postedfile.FileName).Take(10).ToArray()).Replace(" ", "-");
                    fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedfile.FileName);
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    var contentRootPath = _hostingEnvironment.ContentRootPath;
                    //var fileName = Path.GetFileName(postedfile.FileName);
                     filePath = contentRootPath + "\\Documents\\" + fileName;

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await postedfile.CopyToAsync(stream);
                    }
                }
                comp.ComplaintDocName = fileName;
                comp.ComplaintDocPath = filePath;
                var data = await _registercomplaintService.SaveRegisterComplaint(comp);


                


                return Ok(data);
            }
            catch (Exception Ex)
            {

                throw Ex;
            }

        }


        [ActionName("UpdateComplaint")]
        [HttpPost]
        public async Task<IActionResult> UpdateComplaint(ComplaintRegistration comp)
        {

            try

            {
                var data = await _registercomplaintService.UpdateComplaint(comp);
                return Ok(data);
            }
            catch (Exception Ex)
            {

                throw Ex;
            }

        }
        [ActionName("AssignComplaint")]
        [HttpPost]
        public async Task<IActionResult> AssignComplaint(ComplaintRegistration comp)
        {

            try

            {
                var data = await _registercomplaintService.AssignComplaint(comp);
                return Ok(data);
            }
            catch (Exception Ex)
            {

                throw Ex;
            }

        }
        [HttpGet]
        public async Task<FileStream> DownloadFile(string fileName)
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\Documents\\";
            var file = Path.Combine(Path.Combine(currentDirectory), fileName);
            return new FileStream(file, FileMode.Open, FileAccess.Read);
        }
    }
}
