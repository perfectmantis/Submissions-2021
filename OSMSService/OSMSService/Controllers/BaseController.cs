using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSMSService.Models;
using System.Net.Http;


namespace OSMSService.Controllers
{
    public class BaseController : System.Web.Http.ApiController
    {
        public SurveyManagementEntities db = new SurveyManagementEntities();
        // GET: Base
        //public ActionResult Index()
        //{
        //    return View();
        //}
    }
}