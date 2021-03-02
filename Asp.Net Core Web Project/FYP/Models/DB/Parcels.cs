using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Models.DB
{
    public class Parcels
    {
        [Key]
        public long cid { get; set; }
        public long customer_id { get; set; }
        public string consignee { get; set; }
        public string destination { get; set; }
        public string consignee_address { get; set; }
        public string phone { get; set; }
        public int weight { get; set; }
        public int cod { get; set; }
        public string receiver { get; set; }

        [ForeignKey("customer_id")]
        public virtual Customers Customers { get; set; }
        public ICollection<Booking_Statuss> Booking_Statusses { get; set; }
    }
}
