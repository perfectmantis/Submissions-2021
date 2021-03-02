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
    public class ListController : Controller
    {
        private fypDBContext db;

        public ListController(fypDBContext _db)
        {
            db = _db;
        }

        public IActionResult Index(Parcels parcel, string status, string search)
        {
            ViewBag.status_combo = db.status_list.AsNoTracking().ToList();
            List<VirtualList> v = new List<VirtualList>();
            if (search == "Search")
            {
                List<Parcels> parcels = new List<Parcels>();
                if (parcel.cid == 0 && parcel.destination == null)
                {
                    parcels = db.parcel.AsNoTracking().ToList();
                }
                else if (parcel.cid != 0 && parcel.destination == null)
                {
                    parcels = db.parcel.Where(x => x.cid == parcel.cid).AsNoTracking().ToList();
                }
                else if (parcel.cid == 0 && parcel.destination != null)
                {
                    parcels = db.parcel.Where(x => x.destination == parcel.destination).AsNoTracking().ToList();
                }
                else if (parcel.cid != 0 && parcel.destination != null)
                {
                    parcels = db.parcel.Where(x => x.cid == parcel.cid && x.destination == parcel.destination).AsNoTracking().ToList();
                }
                if (status == "0")
                {
                    var vi = from p in parcels
                             join c in db.customer.AsNoTracking().ToList() on p.customer_id equals c.customer_id into table1
                             from c in table1
                             join st in db.booking_status.AsNoTracking().ToList() on p.cid equals st.booking_id into table2
                             from st in table2.OrderByDescending(x => x.status_id).Take(1)
                             join s in db.status_list.AsNoTracking().ToList() on st.status equals s.id into table3
                             from s in table3
                             select new VirtualList { customers = c, parcels = p, status_lists = s };

                    v = vi.ToList();
                }
                else
                {
                    int status_id = int.Parse(status);
                    var vi = from p in parcels
                             join c in db.customer.AsNoTracking().ToList() on p.customer_id equals c.customer_id into table1
                             from c in table1
                             join st in db.booking_status.AsNoTracking().ToList() on p.cid equals st.booking_id into table2
                             from st in table2.OrderByDescending(x => x.status_id).Take(1).Where(x => x.status == status_id)
                             join s in db.status_list.AsNoTracking().ToList() on st.status equals s.id into table3
                             from s in table3
                             select new VirtualList { customers = c, parcels = p, status_lists = s };

                    v = vi.ToList();
                }
            }
                return View(v);
        }
    }
}
