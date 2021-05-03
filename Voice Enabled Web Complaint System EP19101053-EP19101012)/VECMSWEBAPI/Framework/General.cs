using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Net.Mail;
using WebApiCore_Base.Framework;

namespace WebApiCoreProject.Framework
{
    public  class General
    {
        internal static DataTable ExecuteADOSp(string spName, string[] ParameterName=null, params object[] parameters)
        {
            try
            {
                DataTable dt = new DataTable();
                //  DataSet dt1 = new DataSet();

                SqlConnection conn = new SqlConnection(Connection.ConnectionString);
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandText = spName;
                cmd.CommandType = CommandType.StoredProcedure;
                if (ParameterName !=null)
                {
                    int i = 0;
                    foreach (var item in ParameterName)
                    {
                        cmd.Parameters.Add(new SqlParameter("@" + item, parameters[i]));
                        i++;
                    }
                }
                SqlDataAdapter adp = new SqlDataAdapter();
                adp.SelectCommand = cmd;

                adp.Fill(dt);


                return dt;

            }
            catch (Exception Ex)
            {

                throw new Exception();
            }
        }

        internal static DataSet ExecuteADOSpE(string spName, string[] ParameterName = null, params object[] parameters)
        {
            try
            {
              //  DataTable dt = new DataTable();
                  DataSet ds = new DataSet();

                SqlConnection conn = new SqlConnection(Connection.ConnectionString);
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandText = spName;
                cmd.CommandType = CommandType.StoredProcedure;
                if (ParameterName != null)
                {
                    int i = 0;
                    foreach (var item in ParameterName)
                    {
                        cmd.Parameters.Add(new SqlParameter("@" + item, parameters[i]));
                        i++;
                    }
                }
                SqlDataAdapter adp = new SqlDataAdapter();
                adp.SelectCommand = cmd;

                adp.Fill(ds);


                return ds;

            }
            catch (Exception Ex)
            {

                throw new Exception();
            }
        }

        static bool IsEmail = false;
        internal static bool SendEmail(string to, string body, string subject = "", bool Ishtml = false)
        {
            try
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                //client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential("noreplymedproweb@gmail.com", "inactive392");
                MailMessage msg = new MailMessage();
                msg.To.Add(to);
                msg.From = new MailAddress("noreplymedproweb@gmail.com");
                msg.Subject = subject != null ? subject : "Your Login Information at Complaint Managment Portal";
                msg.IsBodyHtml = Ishtml;
                msg.Body = body;
                client.Send(msg);
                return IsEmail = true;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
