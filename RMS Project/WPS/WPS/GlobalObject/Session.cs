using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Web.Security;
using System.Web.Routing;

namespace WPS
{
    public class Session : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            //HttpContext.Current.Session["UserID"] = "103";
            if (HttpContext.Current.Session["UserInfo"] == null)
            {
                //FoCMSAuthentication.SignOut();
                filterContext.Result = new RedirectResult("~/Login/Login?iurl=" + ctx.Request.Url);
                //new RedirectToRouteResult(new RouteValueDictionary   { { "action", "Login" },  { "controller", "Login" }});

                return;
            }
        }
    }
}