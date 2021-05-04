using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BookStore.Models;

namespace BookStore.Controllers
{
    public class AllbookController : Controller
    {
        //This is edit by Irfan
        // GET: Image
        public ActionResult Index()
        {
            BookstoreEntities1 dbt = new BookstoreEntities1();

            
            return View(dbt.Books.ToList());
        }
      

        //search

        BookstoreEntities1 db = new BookstoreEntities1();

        public ActionResult Search(string Sortorder, string Sortby)
        {
            ViewBag.Sortorder = Sortorder;
            var srch = db.Books.ToList();
            switch (Sortorder)
            {
                case "Asc":
                    {
                        srch = srch.OrderBy(x => x.Name).ToList();
                        break;

                    }
                case "Desc":
                    {
                        srch = srch.OrderByDescending(x => x.Name).ToList();
                        break;
                    }
                default:
                    {
                        srch = srch.OrderBy(x => x.Name).ToList();
                        break;

                    }


            }
            return View(srch);
        }
        [HttpPost]
        public ActionResult Search(string searchtxt, string Sortorder, string Sortby)
        {
            var srch = db.Books.ToList();
            if (searchtxt != null)
            {
                srch = db.Books.Where(x => x.Name.Contains(searchtxt) || x.Author.Contains(searchtxt) || x.Condition.Contains(searchtxt) || x.Discription.Contains(searchtxt)).ToList();

            }
            return View(srch);
        }

        [HttpGet]
        public ActionResult Download()
        {
            return View();
        }


        [HttpGet]
        public ActionResult Buy()
        {
            return View();
        }
    }
}
