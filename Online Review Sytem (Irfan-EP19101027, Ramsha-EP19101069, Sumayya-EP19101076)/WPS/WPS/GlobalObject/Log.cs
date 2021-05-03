using System;
using System.Configuration;
using System.IO;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Net;
using System.Web.Script.Serialization;
using System.Data.Entity.Validation;
/// <summary>
/// Summary description for Log
/// </summary>
namespace WPS
{
    public static class Log
    {
        public static void LogWrite(string msg, string fileName, Exception ex)
        {
            StreamWriter _sw;
            //PMSUtility utility = new PMSUtility();

            try
            {
                var logPath = HttpContext.Current.Server.MapPath("../Logging/");

                DirectoryInfo di = new DirectoryInfo(logPath);
                if (!di.Exists)
                {
                    Directory.CreateDirectory(logPath);
                }

                var FilePath = @logPath + fileName + " - " + DateTime.Now.ToString("dd-MMM-yyyy") + ".txt";
                FileInfo fi = new FileInfo(FilePath);

                if (!fi.Exists)
                {
                    File.WriteAllText(FilePath, "");
                    //fi.Create();
                }

               
                _sw = new StreamWriter(FilePath, true);

                try
                {
                    string _error = "";
                    if (ex != null)
                    {
                        

                        _error += "============================ Start Error ========================================================" + "\r\n";
                        _error += "Time : " + DateTime.Now.ToLongTimeString() + "\r\n" + "\r\n";
                        _error += "Error : " + ex == null ? "" : ex.Message == null ? "" : ex.Message + "\r\n" + "\r\n";
                        _error += "StackTrace  : " + ex == null ? "" : ex.StackTrace == null ? "" : ex.StackTrace + "\r\n" + "\r\n";
                        _error += "TargetSite   : " + ex == null ? "" : ex.TargetSite == null ? "" : ex.TargetSite + "\r\n";
                        _error += "Line No.  :" + msg + "\r\n";
                        _error += "============================= End Error =========================================================" + "\r\n" + "\r\n";

                        _sw.WriteLine(_error);
                        _sw.Close();
                    }
                    else
                    {
                        _error += "Time : " + DateTime.Now.ToLongTimeString() + "\r\n" + "\r\n";
                        _error += "Line No.  :" + msg + "\r\n";
                        
                        _sw.WriteLine(_error);
                        _sw.Close();
                    }   
                    
                    
                }
                finally
                {
                    _sw.Close();
                }

                string body = "";
                if (ex != null)
                {
                    body += "Error : " + ex == null ? "" : ex.Message == null ? "" : ex.Message + "<br />" + "<br />";
                    body += "StackTrace  : " + ex == null ? "" : ex.StackTrace == null ? "" : ex.StackTrace + "<br />" + "<br />";
                    body += "TargetSite   : " + ex == null ? "" : ex.TargetSite == null ? "" : ex.TargetSite + "<br />" + "<br />";
                }
                

                //utility.sendMail("ApplicationError@poweredms.com", "Error in " + fileName + " - " + DateTime.Now.ToString("dd-MMM-yyyy"), body);

            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        System.Console.WriteLine("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
                    }
                }
                //throw e;
            }

        }


    }

    public static class ServiceModel
    {
        public static HttpWebResponse GetRequestService(string module, string controller, string id, string[] otherParams)
        {
            try
            {
                string sUrl = ConfigurationManager.AppSettings["ServiceIP"].ToString() + module + ".svc/" + controller + "/" + id + "";
                HttpWebRequest request = WebRequest.Create(sUrl) as HttpWebRequest;
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        //throw new Exception(String.Format("Server error (HTTP {0}: {1}).", response.StatusCode, response.StatusDescription));
                        Log.LogWrite(String.Format("Server error (HTTP {0}: {1}).", response.StatusCode, response.StatusDescription), "Service Request", new Exception(String.Format("Server error (HTTP {0}: {1}).", response.StatusCode, response.StatusDescription)));
                    }


                    return response;

                }
            }
            catch (Exception e)
            {
                // catch exception and log it.
                Log.LogWrite("Server error.", "Service Request", e);
                return null;
            }
        }
    }
}