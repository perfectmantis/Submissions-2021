using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace OSMS.Areas.QuestionnaireManagement.Models
{
    public class OptionTypeModelClass
    {
        [Display(Name = "Control ID")]
        public byte OptionTypeId { get; set; }

        [Display(Name = "Control Name")]
        public string OptionTypeName { get; set; }

        public byte maxId { get; }
    }
}