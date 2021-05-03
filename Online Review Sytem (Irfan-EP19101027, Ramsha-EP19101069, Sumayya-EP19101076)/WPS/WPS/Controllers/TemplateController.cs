using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;


namespace WPS.Controllers
{
    public class TemplateController : Controller
    {
        // GET: Template
        UserServiceModel dbUser = new UserServiceModel();
        public ActionResult Form()
        {
            dbUser.getUserTypes();
            return View();
        }

       
    }
}