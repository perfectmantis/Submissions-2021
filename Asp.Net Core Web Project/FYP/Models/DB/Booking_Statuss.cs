using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FYP.Models.DB
{
    public class Booking_Statuss
    {
        [Key]
        public long status_id { get; set; }
        public long booking_id { get; set; }
        public int status { get; set; }
        public DateTime date { get; set; }
        public string time { get; set; }

        [ForeignKey("booking_id")]
        public Parcels Parcels { get; set; }
        [ForeignKey("status")]
        public Status_Lists Status_Lists { get; set; }
    }
}
