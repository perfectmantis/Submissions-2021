using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Models.DB
{
    public class Status_Lists
    {
        [Key]
        public int id { get; set; }
        public string status { get; set; }
        public ICollection<Booking_Statuss> Booking_Statusses { get; set; }
    }
}
