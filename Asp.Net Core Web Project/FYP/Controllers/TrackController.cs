using FYP.Models;
using FYP.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Controllers
{
    public class TrackController : Controller
    {
        private fypDBContext db;
        public TrackController(fypDBContext _db)
        {
            db = _db;
        }

        public IActionResult Index(string id)
        {
            //new virtual list
            VirtualList v = new VirtualList();
            try
            {
                long booking_number = long.Parse(id);
                //get the booking data
                Parcels parcels = db.parcel.Where(x => x.cid == booking_number).FirstOrDefault();
                //get the tracking data
                List<Booking_Statuss> bs = db.booking_status.Where(x => x.booking_id == booking_number).AsNoTracking().OrderByDescending(x => x.status_id).ToList();
                v.parcels = parcels;
                //complete tracking history with status title
                //join between status id and status
                ViewBag.list = from b in bs
                               join s in db.status_list.AsNoTracking().ToList() on b.status equals s.id into table1
                               from s in table1
                               select new VirtualList { status_lists = s, booking_Statuss = b };
           }
            catch(Exception e)
            {
                ViewBag.msg = "no record found" + e.Message;
            }
            return View(v);
        }
    }
}
