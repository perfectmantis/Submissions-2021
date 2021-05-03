using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMSService.Areas.QuestionnaireManagement.Models
{
    public class QuestionnaireModelClass
    {
        public long QuestionnaireId { get; set; }
        public string QuestionnaireDesc { get; set; }
        public bool QuestionnaireStatus { get; set; }
        public int UserId { get; set; }

        public string UserName { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<System.DateTime> Expiry { get; set; }
        public Nullable<long> MaxResponse { get; set; }
    }
}