using System.Web.Mvc;
using OSMS.Models;
using OSMS.Areas.QuestionnaireManagement.Models;

namespace OSMS.Areas.QuestionnaireManagement.Controllers
{
    public class OptionTypeController : Controller
    {
        callAPI CallAPI = new callAPI();
        // GET: QuestionnaireManagement/OptionType
        public ActionResult Index()
        {
            //string url = "api/QuestionnaireManagement/Questionnaire/GetAllOptionTypes";
            //var AllOptionType = CallAPI.GetEntityList<OptionTypeModelClass>(url);
            //return Json(new { data = AllOptionType }, JsonRequestBehavior.AllowGet);
            return View("Index");
        }

        public JsonResult GetOptionType()
        {
            string url = "api/QuestionnaireManagement/Questionnaire/GetAllOptionTypes";
            var AllOptionType = CallAPI.GetEntityList<OptionTypeModelClass>(url);
            return Json(new { data = AllOptionType }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OptionTypeInsert(OptionTypeModelClass modelClass)
        {
            string url = "api/QUestionnaireManagement/Questionnaire/OptionTypeInsert";
            int result = CallAPI.InsertUpdateEntity<OptionTypeModelClass>(url, modelClass);
            if (result > 0)
                return Json(new { success = true });
            return Json(new { success = false });
        }

        public JsonResult OptionTypeDelete(int Id)
        {
            string url = "api/QUestionnaireManagement/Questionnaire/OptionTypeDelete";
            bool result = CallAPI.DeleteEntity(url, Id);
            return Json(new { success = result });
        }
    }
}