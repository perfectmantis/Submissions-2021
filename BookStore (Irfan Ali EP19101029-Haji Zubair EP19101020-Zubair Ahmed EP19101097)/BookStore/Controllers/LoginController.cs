using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using BookStore.Models;


namespace BookStore.Controllers
{
    public class LoginController : Controller
    {
        BookstoreEntities2 db = new BookstoreEntities2();

        public object DefaultAuthenticationTypes { get; private set; }

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        //POST:Login
        [HttpPost]
        public ActionResult Index(User log)
        {
            var user=db.Users.Where(x => x.UserName == log.UserName && x.Password == log.Password).Count();

            if (user > 0)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return View();
            }
            
        }

        

    }
}