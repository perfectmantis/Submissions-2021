using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class persondata
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string fname { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public int phone { get; set; }
        public string country { get; set; }
        public string maritial { get; set; }
        public string gender { get; set; }
        public string visatype { get; set; }
      //  public string children { get; set; }
        public int Nochildrens { get; set; }

    }
}