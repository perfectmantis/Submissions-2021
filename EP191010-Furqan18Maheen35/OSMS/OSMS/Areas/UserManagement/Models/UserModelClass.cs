using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMS.Areas.UserManagement.Models
{
    public class UserModelClass
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string LoginPassword { get; set; }
        public string FatherName { get; set; }
        public string Cnic { get; set; }
        public string Email { get; set; }
        public string UserAddress { get; set; }
        public string Department { get; set; }
        public string Organization { get; set; }
        public byte UserType { get; set; }
    }
}