using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookStore.Controllers
{
    public class AdminController : Controller
    {
      
        
        //display list of books in table
        [HttpGet]
        public ActionResult BookList()
        {
            BookstoreEntities1 db = new BookstoreEntities1();
            ViewBag.BookList = db.Books.ToList();
            return View();
        }

        //Adding new book
        [HttpGet]
        public ActionResult Addbook()
        {
            return View();
        }

        [HttpPost]

        public ActionResult Addbook(BookStore.Models.Book book)
        {
            BookstoreEntities1 db = new BookstoreEntities1();

            db.Books.Add(book);
            db.SaveChanges();
            return View();


        }

        //edit books

        [HttpGet]
        public ActionResult Edit(int id)
        {
            BookstoreEntities1 db = new BookstoreEntities1();
            var category=db.Books.Find(id);

            return View(category);
        }
        [HttpPost]
        public ActionResult Edit(Book category)
        {
            BookstoreEntities1 db = new BookstoreEntities1();
            db.Entry(category).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("BookList");
        }

        public ActionResult Delete(int id)
        {
            BookstoreEntities1 db = new BookstoreEntities1();
            var category= db.Books.Find(id);
            db.Books.Remove(category);
            db.SaveChanges();
            return RedirectToAction("BookList");
        }
        
    }
}