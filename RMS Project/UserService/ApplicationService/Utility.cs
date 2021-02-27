using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.IO;
using System.Linq;
using System.Web;

namespace ApplicationService
{
    public static class Utility
    {
        public static string ConnectionString()
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

            var entityBuilder = new EntityConnectionStringBuilder();

            // use your ADO.NET connection string
            entityBuilder.ProviderConnectionString = strCon;
            entityBuilder.Provider = "System.Data.SqlClient";

            // Set the Metadata location.
            entityBuilder.Metadata = @"res://*/Model.UserModel.csdl|res://*/Model.UserModel.ssdl|res://*/Model.UserModel.msl";
            strCon = entityBuilder.ConnectionString;
            //var dbContext = new DbContext(entityBuilder.ConnectionString);
            return strCon;
        }

        public static string EncryptText(string val)
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

        public static string DecryptText(string val)
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
    }
}