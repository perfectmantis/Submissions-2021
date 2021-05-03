using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMSService.Areas.QuestionnaireManagement.Models
{
    public class SectionModelClass
    {
        public long SectionId { get; set; }
        public string SectionName { get; set; }
        public int SequenceNumber { get; set; }
        public long QuestionnaireId { get; set; }
    }
}