using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMSService.Areas.QuestionnaireManagement.Models
{
    public class SurveyRespondentModelClass
    {
        public long RespondentId { get; set; }
        public string RespondentName { get; set; }
        public byte RespondentAge { get; set; }
        public string RespodentEmail { get; set; }
        public string RespondentContact { get; set; }
        public long QuestionnaireId { get; set; }
    }
}