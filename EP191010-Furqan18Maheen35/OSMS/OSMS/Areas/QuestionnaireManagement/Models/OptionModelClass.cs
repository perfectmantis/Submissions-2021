using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace OSMS.Areas.QuestionnaireManagement.Models
{
    public class OptionModelClass
    {
        public long OptionId { get; set; }
        public string OptionName { get; set; }
        public byte OptionTypeId { get; set; }
        public long QuestionId { get; set; }
    }
}