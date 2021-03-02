using FYP.Models.DB;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Controllers
{
    public class BookingController : Controller
    {
        private fypDBContext db;

        public BookingController(fypDBContext _db)
        {
            db = _db;
        }
        
        public IActionResult Index()
        {/*
            Parcels parcel_data = new Parcels();
            parcel_data.customer_number = 1;
            parcel_data.consignee = "sdds";
            parcel_data.consignee_address = "sdsds";
            parcel_data.destination = "sdsada";
            parcel_data.phone = "2232";
            parcel_data.weight = 1;
            parcel_data.cod = 1;
            db.parcel.Add(parcel_data);
            db.SaveChanges();*/
            return View();
        }

        [HttpPost]
        public IActionResult Index(Parcels parcel_data)
        {
                Customers customer = db.customer.Where(x => x.customer_id == parcel_data.customer_id).FirstOrDefault();
            if (customer == null)
            {
                ViewBag.msg = "Customer not found";
            }
            else
            {
                parcel_data.customer_id = 1;
                parcel_data.consignee = "sdds";
                parcel_data.consignee_address = "sdsds";
                parcel_data.destination = "sdsada";
                parcel_data.phone = "2232";
                parcel_data.weight = 1;
                parcel_data.cod = 1;
                db.parcel.Add(parcel_data);
                db.SaveChanges();
                 Parcels parcel_latest = db.parcel.Where(x => x.customer_id == parcel_data.customer_id && x.consignee == parcel_data.consignee && x.destination == parcel_data.destination).OrderByDescending(x => x.cid).FirstOrDefault();
                 Booking_Statuss bs = new Booking_Statuss();
                 bs.booking_id = parcel_latest.cid;
                 bs.status = 1;
                 bs.date = DateTime.Now;
                 bs.time = DateTime.Now.ToShortTimeString();
                 db.booking_status.Add(bs);
                db.SaveChanges();
                ViewBag.msg = "Booking Number: " + parcel_latest.cid;
            }
          return View();
        }
    }
}
