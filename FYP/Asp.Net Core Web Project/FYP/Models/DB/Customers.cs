using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Models.DB
{
    public class Customers
    {
        [Key]
        public long customer_id { get; set; }
        public string customer_name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public virtual ICollection<Parcels> Parcels { get; set; }
    }
}
