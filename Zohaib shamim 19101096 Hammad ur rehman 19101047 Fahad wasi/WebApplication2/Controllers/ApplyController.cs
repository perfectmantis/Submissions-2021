using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;
using System.Data.SqlClient;
using System.Data;

namespace WebApplication2.Controllers
{
    public class ApplyController : Controller
    {
        // GET: Apply
        public ActionResult Index()
        {
            return View("~/Views/Apply/Assessment.cshtml");
        }
        private SqlConnection con = new SqlConnection();
        private void connection()
        {            
        string constr = "Data Source=DESKTOP-1UCR6KI\\SQLEXPRESS;Initial Catalog=immigration; Integrated Security=SSPI";
        con = new SqlConnection(constr);

    }
    public ActionResult send (persondata obj)
        {
            connection();
            SqlCommand com = new SqlCommand("AddNewEmpDetails", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Name", obj.Name);
            com.Parameters.AddWithValue("@Fname", obj.fname);
            com.Parameters.AddWithValue("@Email", obj.Email);
            com.Parameters.AddWithValue("@Phoneno", obj.phone);
            com.Parameters.AddWithValue("@Dateofbirth", obj.DOB);
            com.Parameters.AddWithValue("@Country", obj.country);
            com.Parameters.AddWithValue("@Maritialstatus", obj.maritial);
            com.Parameters.AddWithValue("@Gender", obj.gender);
            com.Parameters.AddWithValue("@Visatype", obj.visatype);
            com.Parameters.AddWithValue("@Siblingcount", obj.Nochildrens);
            con.Open();
            int i = com.ExecuteNonQuery();
            con.Close();
            return Json(new { msg = "Successfully added " });
        }
    }
}