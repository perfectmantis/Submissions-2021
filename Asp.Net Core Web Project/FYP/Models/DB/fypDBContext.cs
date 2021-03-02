using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Models.DB
{
    public class fypDBContext:DbContext
    {
        public fypDBContext(DbContextOptions<fypDBContext> options):base(options)
        {

        }

        public DbSet<Status_Lists> status_list { get; set; }
        public DbSet<Booking_Statuss> booking_status { get; set; }
        public DbSet<Parcels> parcel { get; set; }
        public DbSet<Customers> customer { get; set; }
    }
}
