using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OSMSService.Controllers;

namespace OSMSService.Areas.QuestionnaireManagement.Models
{
    public class OptionTypeModelClass
    {
        public byte OptionTypeId { get; set; }
        public string OptionTypeName { get; set; }

        public byte maxId { get; }
        public int OnGet()
        {
            BaseController con = new BaseController();
            byte OptionTypeId = con.db.OptionTypes.Max(x => x.OptionTypeId);
            OptionTypeId++;
            return OptionTypeId;
        }
    }
}