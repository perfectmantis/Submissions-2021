using System.Web.Mvc;
using OSMS.Models;
using OSMS.Areas.QuestionnaireManagement.Models;
using System.Web.Http;

namespace OSMS.Areas.QuestionnaireManagement.Controllers
{
    public class QuestionnaireController : Controller
    {
        callAPI CallAPI = new callAPI();
        // GET: QuestionnaireManagement/Questionnaire

        [System.Web.Http.HttpGet]
        public ActionResult Index()
        {
            return View();
        }
       
        [System.Web.Http.HttpPost] 
        public JsonResult QuestionnaireHistory(int UserId)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/GetAllQuestionnaireByUserId?UserId=";
            var AllQuestionnaire = CallAPI.GetEntityListById<QuestionnaireModelClass>(url, UserId);
            return Json(new { data = AllQuestionnaire }, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public ActionResult QuestionnaireInsert(QuestionnaireModelClass modelClass)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/QuestionnaireInsert";
            var AllQuestionnaire = CallAPI.InsertUpdateEntity2<QuestionnaireModelClass>(url, modelClass);
            return Json(new { data = AllQuestionnaire }, JsonRequestBehavior.AllowGet); //View("NewQuestionnaire", AllQuestionnaire);//
        }

        public JsonResult GetAllSectionByQuestionnaireId(int QuestionnaireID)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/GetAllSectionByQuestionnaireId";
            var AllQuestionnaire = CallAPI.GetEntityListById<SectionModelClass>(url, QuestionnaireID);
            return Json(new { data = AllQuestionnaire }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPagesBySectionId(int SectionId)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/GetPagesBySectionId";
            var AllPage = CallAPI.GetEntityListById<PageModelClass>(url, SectionId);
            return Json(new { data = AllPage }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SectionInsert(SectionModelClass modelClass)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/SectionInsert";
            var AllSection = CallAPI.InsertUpdateEntity<SectionModelClass>(url, modelClass);

            //QuestionnaireModelClass questionnaireModel = new QuestionnaireModelClass();
            //url = "api/QuestionnaireManagement/Questionnaire/GetQuestionnaireByQuestionnaireId?QuestionnaireId=";
            //var Questionnaire = CallAPI.GetEntityById<QuestionnaireModelClass>(url, modelClass.QuestionnaireId.ToString());
            //return View("NewQuestionnaire", Questionnaire);
            //return NewQuestionnaire(modelClass.QuestionnaireId);
            //return RedirectToAction("NewQuestionnaire", "Questionnaire", new { QuestionnaireId = modelClass.QuestionnaireId });
            //return Redirect("http://localhost:11781/QuestionnaireManagement/Questionnaire/NewQuestionnaire?QuestionnaireId=" + modelClass.QuestionnaireId);
            //
            return Json(new { data = AllSection, QuestionnaireID = modelClass.QuestionnaireId }, JsonRequestBehavior.AllowGet);
            //string RedirectUrl = Url.Action("GetAllSectionByQuestionnaireId");
            //return RedirectToRoute("http://localhost:11781/QuestionnaireManagement/Questionnaire/NewQuestionnaire");//RedirectToAction("GetAllSectionByQuestionnaireId", 7);
        }

        public ActionResult SectionDelete(int SectionId)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/SectionDelete";
            var AllSection = CallAPI.DeleteEntity(url, SectionId);
            // return Json(new { data = AllSection }, JsonRequestBehavior.AllowGet);
            string RedirectUrl = Url.Action("GetAllSectionByQuestionnaireId");
            return RedirectToRoute("http://localhost:11781/QuestionnaireManagement/Questionnaire/NewQuestionnaire");//RedirectToAction("GetAllSectionByQuestionnaireId", 7);
        }
        public ActionResult NewQuestionnaire(long? QuestionnaireId)
        {
            if (QuestionnaireId.HasValue && QuestionnaireId.Value > 0)
            {
                QuestionnaireModelClass questionnaireModel = new QuestionnaireModelClass();
                string url = "api/QuestionnaireManagement/Questionnaire/GetQuestionnaireByQuestionnaireId?QuestionnaireId=";
                var Questionnaire = CallAPI.GetEntityById<QuestionnaireModelClass>(url, QuestionnaireId.Value.ToString());
                return View(Questionnaire);
            }
            return View();
        }

        public ActionResult PageInsert(PageModelClass modelClass)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/PageInsert";
            var AllSection = CallAPI.InsertUpdateEntity<PageModelClass>(url, modelClass);

            //QuestionnaireModelClass questionnaireModel = new QuestionnaireModelClass();
            //url = "api/QuestionnaireManagement/Questionnaire/GetQuestionnaireByQuestionnaireId?QuestionnaireId=";
            //var Questionnaire = CallAPI.GetEntityById<QuestionnaireModelClass>(url, modelClass.QuestionnaireId.ToString());
            //return View("NewQuestionnaire", Questionnaire);
            //return NewQuestionnaire(modelClass.QuestionnaireId);
            //return RedirectToAction("NewQuestionnaire", "Questionnaire", new { QuestionnaireId = modelClass.QuestionnaireId });
            //return Redirect("http://localhost:11781/QuestionnaireManagement/Questionnaire/NewQuestionnaire?QuestionnaireId=" + modelClass.QuestionnaireId);
            //
            return Json(new { data = AllSection }, JsonRequestBehavior.AllowGet);
            //string RedirectUrl = Url.Action("GetAllSectionByQuestionnaireId");
            //return RedirectToRoute("http://localhost:11781/QuestionnaireManagement/Questionnaire/NewQuestionnaire");//RedirectToAction("GetAllSectionByQuestionnaireId", 7);
        }

        public ActionResult QuestionInsert(QuestionModelClass modelClass)
        {
            string url = "api/QuestionnaireManagement/Questionnaire/QuestionInsert";
            var AllSection = CallAPI.InsertUpdateEntity<QuestionModelClass>(url, modelClass);
           
            return Json(new { data = AllSection }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PreviewQuestionnaire()
        {
            return View();
        }

    }
}