using FYP.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Controllers
{
    public class UpdateController : Controller
    {
        private fypDBContext db;
        public UpdateController(fypDBContext _db)
        {
            db = _db;
        }
        public IActionResult Index(string id)
        {
            long cid = long.Parse(id);
            ViewBag.status_combo = db.status_list.AsNoTracking().ToList();
            ViewBag.id = id;
            return View();
        }

       [HttpPost]
        public IActionResult Index(Booking_Statuss b)
        {
            DateTime d = DateTime.Now;
            b.date = d;
            b.time = DateTime.Now.ToShortTimeString();
            db.booking_status.Add(b);
            db.SaveChanges();
            return RedirectToAction("Index" , "Track", new { id = b.booking_id });
        }
    }
}
