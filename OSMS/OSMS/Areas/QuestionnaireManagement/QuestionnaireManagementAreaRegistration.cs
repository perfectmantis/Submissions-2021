using System.Web.Mvc;

namespace OSMS.Areas.QuestionnaireManagement
{
    public class QuestionnaireManagementAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "QuestionnaireManagement";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "QuestionnaireManagement_default",
                "QuestionnaireManagement/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}