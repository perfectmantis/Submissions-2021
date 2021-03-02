using FYP.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Models
{
    public class VirtualList
    {
        public Booking_Statuss booking_Statuss { get; set; }
        public Customers customers { get; set; }
        public Parcels parcels { get; set; }
        public Status_Lists status_lists { get; set; } 

    }
}
