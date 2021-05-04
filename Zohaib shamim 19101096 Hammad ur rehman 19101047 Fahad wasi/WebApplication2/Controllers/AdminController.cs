using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;
using Newtonsoft.Json;
using Aspose.Words;

namespace WebApplication2.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        private SqlConnection con = new SqlConnection();
        private void connection()
        {
            string constr = "Data Source=DESKTOP-1UCR6KI\\SQLEXPRESS;Initial Catalog=immigration; Integrated Security=SSPI";
            con = new SqlConnection(constr);
        }
        public JsonResult GetAllEmployees()
        {
            connection();
            List<persondata> EmpList = new List<persondata>();
            SqlCommand com = new SqlCommand("GetEmployees", con);
            com.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(com);
            DataTable dt = new DataTable();
            con.Open();
            da.Fill(dt);
            con.Close();

            //Bind EmpModel generic list using LINQ 
            EmpList = (from DataRow dr in dt.Rows

                       select new persondata()
                       {
                           Id = Convert.ToInt32(dr["Id"]),
                           Name = Convert.ToString(dr["Name"]),
                           fname = Convert.ToString(dr["Fname"]),
                           DOB = Convert.ToDateTime(dr["Dateofbirth"]),
                           Email = Convert.ToString(dr["Email"]),
                           phone = Convert.ToInt32(dr["Phoneno"]),
                           country = Convert.ToString(dr["Country"]),
                           maritial = Convert.ToString(dr["Maritialstatus"]),
                           gender = Convert.ToString(dr["Gender"]),
                           visatype = Convert.ToString(dr["Visatype"]),
                           Nochildrens = Convert.ToInt32(dr["Siblingcount"])                      

                       }).ToList();
            var json = JsonConvert.SerializeObject(EmpList);
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public void deldata(string parameter1, string parameter2)
        {
            connection();
            SqlCommand com = new SqlCommand("DeleteEmployee", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Name", parameter1);
            com.Parameters.AddWithValue("@Fname", parameter2);
            con.Open();
            int i = com.ExecuteNonQuery();
            con.Close();       

        }

        public bool Updatedata(int id, string Name, string Fname, string Visatype )
        {
            connection();
            SqlCommand com = new SqlCommand("Updatedata", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Id", id);
            com.Parameters.AddWithValue("@Name", Name);
            com.Parameters.AddWithValue("@FName", Fname);
            com.Parameters.AddWithValue("@Visatype", Visatype);
            con.Open();
            int i = com.ExecuteNonQuery();
            con.Close();
            return true;
        }

        public JsonResult getforUpdate(int Id)
        {
            connection();
            persondata EmpList = new persondata();
            SqlCommand com = new SqlCommand("getone", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Id", Id);


            con.Open();
      

            SqlDataReader rdr = com.ExecuteReader();
            while (rdr.Read())
            {

                EmpList.Id = Convert.ToInt32(rdr["Id"]);
                EmpList.Name = rdr["Name"].ToString();
                EmpList.fname = rdr["FName"].ToString();
                EmpList.visatype = rdr["Visatype"].ToString();
               

            }
            var json = JsonConvert.SerializeObject(EmpList);
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        public void downloadform(int Id)
        {
            connection();
            persondata EmpList = new persondata();
            SqlCommand com = new SqlCommand("getone", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Id", Id);
            con.Open();            
            SqlDataReader rdr = com.ExecuteReader();
            while (rdr.Read())
            {
                EmpList.Id = Convert.ToInt32(rdr["Id"]);
                EmpList.Name = rdr["Name"].ToString();
                EmpList.country = rdr["Country"].ToString();
                EmpList.visatype = rdr["Visatype"].ToString();
                EmpList.Email = rdr["Email"].ToString();
                EmpList.phone = Convert.ToInt32(rdr["Phoneno"]);
                EmpList.Nochildrens = Convert.ToInt32(rdr["Siblingcount"]);
                EmpList.DOB = Convert.ToDateTime(rdr["Dateofbirth"]);


            }          
            const string loc = "C:\\zohaib\\";
            Document doc = new Document(loc + "name.docx");
          doc.MailMerge.Execute(new string[] { "id","NAME", "VISA", "PHONE", "COUNTRY", "CHILDS","EMAIL" ,"DATE",}, new object[] { EmpList.Id,EmpList.Name,EmpList.visatype, EmpList.phone,EmpList.country,EmpList.Nochildrens,EmpList.Email,EmpList.DOB});
          doc.Save(loc + " "+EmpList.Id + " _ " + EmpList.Name+".docx");
        }
    }
    }

    

