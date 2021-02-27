using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMS.Areas.QuestionnaireManagement.Models
{
    public class PageModelClass
    {
        public long PageId { get; set; }
        public string PageName { get; set; }
        public int SequenceNumber { get; set; }
        public long SectionId { get; set; }
    }
}