using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMSService.Areas.QuestionnaireManagement.Models
{
    public class OptionModelClass
    {
        public long OptionId { get; set; }
        public string OptionName { get; set; }
        public byte OptionTypeId { get; set; }
        public long QuestionId { get; set; }
    }
}