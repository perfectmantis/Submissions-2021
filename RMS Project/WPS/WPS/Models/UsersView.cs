using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace WPS.Models
{
    public class UsersView
    {
        public string _BaseURL = "http://localhost:59292/api/";
        public HttpClient client = new HttpClient();
    }
}