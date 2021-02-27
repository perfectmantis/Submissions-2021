using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.Entity.Core.EntityClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Reflection;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WPS.Models;
using Microsoft.Reporting.WebForms;

namespace WPS
{
    public class Utility
    {
        UserServiceModel dbUser = new UserServiceModel();
        WPSServiceModel dbWPS = new WPSServiceModel();
        public bool sendMail(String to, String subject, String body)
        {
            try
            {

                MailAddress To = new MailAddress(to);
                MailAddress From = new MailAddress(@"irfanrafiq90@gmail.com", "Wetek Technologies");
                //string emailFrom = @"developer.soft@ymail.com";
                //MailAddress From = new MailAddress(emailFrom, "Powered Management Services");
                MailMessage m = new MailMessage(From, To);
                m.Subject = subject;
                m.IsBodyHtml = true;
                m.Body = body;
                SmtpClient s = new SmtpClient("mail.google.com", 25);
                //SmtpClient s = new SmtpClient("smtp.mail.yahoo.com", 465);
                s.EnableSsl = true;
                s.UseDefaultCredentials = true;
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.Credentials = new System.Net.NetworkCredential(@"irfanrafiq90@gmail.com", "Irfan321");
                //s.Credentials = new System.Net.NetworkCredential(emailFrom, "Irfan321");
                //s.Timeout = 20000;
                ServicePointManager.ServerCertificateValidationCallback = delegate (object so, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };
                s.Send(m);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Email Sending Failed", ex);
                return false;
            }
        }

        public bool sendMail(String to, String cc, String subject, String body, string[] strAttachment)
        {
            try
            {
                MailAddress To = new MailAddress(to);



                MailAddress From = new MailAddress(@"irfanrafiq90@gmail.com", "SIT TEK Techonologies");
                MailMessage m = new MailMessage(From, To);
                if (cc != "")
                {
                    MailAddress CC = new MailAddress(cc);
                    m.CC.Add(CC);
                }

                m.Subject = subject;
                foreach (var item in strAttachment)
                {
                    if (item != null)
                    {
                        Attachment attach = new Attachment(item);
                        m.Attachments.Add(attach);
                    }

                }


                //if (Depositslip.ToString() != "")
                //{
                //    Attachment Depositslipattach = new Attachment(Depositslip);
                //    m.Attachments.Add(Depositslipattach);

                //}

                m.IsBodyHtml = true;
                m.Body = body;
                SmtpClient s = new SmtpClient("mail.gmail.com", 25);
                s.EnableSsl = true;
                s.UseDefaultCredentials = true;
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.Credentials = new System.Net.NetworkCredential(@"irfanrafiq90@gmail.com", "Irfan321");
                s.Timeout = 20000;
                ServicePointManager.ServerCertificateValidationCallback = delegate (object so, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };
                s.Send(m);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Email Sending Failed", ex);
                return false;
            }
        }

        public void IsSpecifed<T>(T t)
        {
            foreach (PropertyInfo prop in typeof(T).GetProperties())
            {
                if (prop.Name.Contains("Specified"))
                {
                    prop.SetValue(t, true);
                }
                
            }
        }

        public string GetUniqueKey(int maxSize)
        {
            char[] chars = new char[62];
            chars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            byte[] data = new byte[1];
            RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
            crypto.GetNonZeroBytes(data);
            data = new byte[maxSize];
            crypto.GetNonZeroBytes(data);
            StringBuilder result = new StringBuilder(maxSize);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length)]);
            }
            return result.ToString();
        }

        public bool IsInRole(string roleName, int? userID)
        {
            try
            {
                int UserType= dbUser.GetUserById(userID.Value).UserTypeId.Value;

                int userTypeCount = dbUser.getAccessByUserTypeAndRoleName(UserType, roleName).Count();

                if (userTypeCount > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public string ConnectionString()
        {
            string strCon = "";
            string fileName = HttpContext.Current.Server.MapPath("~/bin/connection.data");
            if (File.Exists(fileName))
            {
                // Create the reader for data.
                FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read);
                BinaryReader r = new BinaryReader(fs);
                // Read data from Test.data.
                strCon = DecryptText(r.ReadString());

                r.Close();
                fs.Close();
                //strCon_Global = ConfigurationSettings.AppSettings["ConnectionString"];

                /*
                App_Code.Utility util = new App_Code.Utility();
                this.Connection.ConnectionString = util.rtnConnectionString();
                */
            }
            return strCon;
        }

        public  string EncryptText(string val)
        {
            string encryptVal = "";
            foreach (char c in val)
            {
                int charCharacter = (int)c;
                char charTextAfterEncrypt = (char)((charCharacter + 25) - 10);
                encryptVal = encryptVal + charTextAfterEncrypt;
            }
            return encryptVal;
        }

        public string DecryptText(string val)
        {
            string DecryptVal = "";
            foreach (char c in val)
            {
                int charCharacter = (int)c;
                char charTextAfterDecrypt = (char)((charCharacter + 10) - 25);
                DecryptVal = DecryptVal + charTextAfterDecrypt;
            }
            return DecryptVal;
        }

        public DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table 
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        public FileContentResult GenerateReport( string datasetname, string FilePath, IEnumerable datasource, string fileType, string MarginTop, string MarginBottom, string MarginLeft, string MarginRight, string PageSize, string Orientation, ReportParameter[] parms)
        {

            try
            {
                LocalReport lr = new LocalReport();

                if (System.IO.File.Exists(FilePath))
                {
                    lr.ReportPath = FilePath;
                }

                ReportDataSource rd = new ReportDataSource(datasetname, datasource);

                lr.EnableExternalImages = true;

                if (parms != null && parms.Count() > 0)
                {
                    lr.SetParameters(parms);
                }

                lr.Refresh();

                lr.DataSources.Add(rd);
                string reportType = fileType;
                string mimeType;
                string encoding;
                string fileNameExtension;
                string PageWidth = "";
                string PageHeight = "";

                switch (PageSize)
                {
                    case "Legal":
                        PageWidth = (Orientation == "P") ? "8.5" : "14";
                        PageHeight = (Orientation == "P") ? "14" : "8.5";
                        break;
                    case "Letter":
                        PageWidth = (Orientation == "P") ? "8.5" : "11";
                        PageHeight = (Orientation == "P") ? "11" : "8.5";
                        break;
                    case "A3":
                        PageWidth = (Orientation == "P") ? "11.7" : "16.5";
                        PageHeight = (Orientation == "P") ? "16.5" : "11.7";
                        break;
                    case "A4":
                        PageWidth = (Orientation == "P") ? "8.3" : "11.7";
                        PageHeight = (Orientation == "P") ? "11.7" : "8.3";
                        break;
                    case "A5":
                        PageWidth = (Orientation == "P") ? "5.8" : "8.3";
                        PageHeight = (Orientation == "P") ? "8.3" : "8";
                        break;
                    default:
                        break;
                }
                string deviceInfo =
                "<DeviceInfo>" +
                "  <OutputFormat>" + fileType + "</OutputFormat>" +
                "  <PageWidth>" + PageWidth + "in</PageWidth>" +
                "  <PageHeight>" + PageHeight + "In</PageHeight>" +
                "  <MarginTop>" + MarginTop + "in</MarginTop>" +
                "  <MarginLeft>" + MarginLeft + "in</MarginLeft>" +
                "  <MarginRight>" + MarginRight + "in</MarginRight>" +
                "  <MarginBottom>" + MarginBottom + "in</MarginBottom>" +
                "</DeviceInfo>";

                Warning[] warnings;
                string[] streams;
                byte[] renderedBytes;

                renderedBytes = lr.Render(
                    reportType,
                    deviceInfo,
                    out mimeType,
                    out encoding,
                    out fileNameExtension,
                    out streams,
                    out warnings);

                return new FileContentResult(renderedBytes, mimeType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}