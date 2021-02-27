using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMSService.Areas.QuestionnaireManagement.Models
{
    public class QuestionModelClass
    {
        public long QuestionId { get; set; }
        public string QuestionName { get; set; }
        public int SequenceNumber { get; set; }
        public long PageId { get; set; }
    }
}