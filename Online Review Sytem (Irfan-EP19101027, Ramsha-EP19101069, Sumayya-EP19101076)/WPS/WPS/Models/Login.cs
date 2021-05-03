using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WPS.Models
{
    public class Login
    {
        public string id { get; set; }
        public string password { get; set; }
    }

    public class ChangePassword
    {
        public string id { get; set; }
        public string Oldpassword { get; set; }
        public string Newpassword { get; set; }
    }

    public class ForgotPassword
    {
        public int? UserId { get; set; }
        public string UserName{ get; set; }
    }
}