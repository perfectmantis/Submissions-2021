using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Profile;
using System.Web.Routing;
using System.Web.Security;

namespace WPS
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        private void SetProviderConnectionString(string connectionString)
        {
            // Set private property of Membership, Role and Profile providers. 
            var connectionStringField = Membership.Provider.GetType().GetField("_sqlConnectionString", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
            if (connectionStringField != null)
                connectionStringField.SetValue(Membership.Provider, connectionString);

            var roleField = Roles.Provider.GetType().GetField("_sqlConnectionString", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
            if (roleField != null)
                roleField.SetValue(Roles.Provider, connectionString);

            var profileField = ProfileManager.Provider.GetType().GetField("_sqlConnectionString", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
            if (profileField != null)
                profileField.SetValue(ProfileManager.Provider, connectionString);
        }

        protected void Application_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            //SetProviderConnectionString(new Utility().ConnectionString());
            SetProviderConnectionString("Data Source=ENVY;Initial Catalog=ORM_FYP;User ID=casablanca;Password=casablanca;Max Pool Size=1000");
        }
    }
}
