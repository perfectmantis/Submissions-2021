using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMS.Areas.QuestionnaireManagement.Models
{
    public class RespondentAnswersModelClass
    {
        public long RespondentAnswerId { get; set; }
        public string RespondentAnswerValue { get; set; }
        public long OptionId { get; set; }
        public long RespondentId { get; set; }
    }
}