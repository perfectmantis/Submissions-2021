using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using OSMSService.Controllers;
using OSMSService.Areas.QuestionnaireManagement.Models;
using OSMSService.Models;

namespace OSMSService.Areas.QuestionnaireManagement.Controllers
{
    public class QuestionnaireController : BaseController
    {
        // GET: QuestionnaireManagement/Questionnaire
        //public ActionResult Index()
        //{
        //    return View();
        //}

        #region Questionnaire
        [System.Web.Http.HttpGet]
        public List<QuestionnaireModelClass> GetAllQuestionnaire()
        {

            var AllQuestionnaire = db.Questionnaires.Select(x => new QuestionnaireModelClass
            {
                QuestionnaireId = x.QuestionnaireId,
                QuestionnaireDesc = x.QuestionnaireDesc,
                QuestionnaireStatus = x.QuestionnaireStatus,

                CreatedOn = x.CreatedOn,
                Expiry = x.Expiry,
                MaxResponse = x.MaxResponse,
                UserId = x.UserId,
                UserName = //db.Questionnaires.Join(db.UserInfoes,
                //q => q.)
                       (from q in db.Questionnaires
                          join u in db.UserInfoes
                          on q.UserId equals u.UserId
                          select u.Name).FirstOrDefault()
            }).ToList();

            return AllQuestionnaire;
        }

        public List<QuestionnaireModelClass> GetAllQuestionnaireByUserId(int UserId)
        {
            var AllQuestionnaire = db.Questionnaires.Select(x => new QuestionnaireModelClass
            {
                QuestionnaireId = x.QuestionnaireId,
                QuestionnaireDesc = x.QuestionnaireDesc,
                QuestionnaireStatus = x.QuestionnaireStatus,
                UserId = x.UserId,
                CreatedOn = x.CreatedOn,
                Expiry = x.Expiry,
                MaxResponse = x.MaxResponse
            }).Where(x => x.UserId == UserId).ToList();

            return AllQuestionnaire;
        }

        public QuestionnaireModelClass GetQuestionnaireByQuestionnaireId(int QuestionnaireId)
        {
            var _Questionnaire = db.Questionnaires.Select(x => new QuestionnaireModelClass
            {
                QuestionnaireId = x.QuestionnaireId,
                QuestionnaireDesc = x.QuestionnaireDesc,
                QuestionnaireStatus = x.QuestionnaireStatus,
                UserId = x.UserId,
                CreatedOn = x.CreatedOn,
                Expiry = x.Expiry,
                MaxResponse = x.MaxResponse
            }).FirstOrDefault(x => x.QuestionnaireId == QuestionnaireId);
            return _Questionnaire;
        }

        [System.Web.Http.HttpPost]
        public Questionnaire QuestionnaireInsert(Questionnaire modelClass)
        {
            if (modelClass.QuestionnaireId > 0)
            {
                modelClass.UserId = 1;
                db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            else
            {
                //var _Questionnaire = new  Questionnaire();
                Int64 ID = db.Questionnaires.Max(x => x.QuestionnaireId);
                modelClass.QuestionnaireId = ID + 1;
                modelClass.CreatedOn = DateTime.Now;
                modelClass.UserId = 1;
                db.Questionnaires.Add(modelClass);
                db.SaveChanges();
            }
            return modelClass;
        }

        public void QuestionnaireUpdate(QuestionnaireModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void QuestionnaireDelete(QuestionnaireModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region Section
        public List<SectionModelClass> GetAllSection()
        {
            var AllSection = db.Sections.Select(x => new SectionModelClass
            {
                SectionId = x.SectionId,
                SectionName = x.SectionName,
                SequenceNumber = x.SequenceNumber,
                QuestionnaireId = x.QuestionnaireId,
            }).ToList();

            return AllSection;
        }

        public List<SectionModelClass> GetAllSectionByQuestionnaireId(int QuestionnaireID)
        {
            var AllSection = db.Sections.Select(x => new SectionModelClass
            {
                SectionId = x.SectionId,
                SectionName = x.SectionName,
                SequenceNumber = x.SequenceNumber,
                QuestionnaireId = x.QuestionnaireId,
            }).Where(x => x.QuestionnaireId == QuestionnaireID).ToList();

            return AllSection;
        }

        public Section GetSectionBySectionId(int SectionId)
        {
            var Sections = db.Sections.FirstOrDefault(x => x.SectionId == SectionId);
            return Sections;
        }

        [System.Web.Http.HttpPost]
        public Int64 SectionInsert(Section modelClass)
        {
            Int64 ID = db.Sections.Max(x => x.SectionId);
            modelClass.SectionId = ID + 1;
            //db.Entry(modelClass);
            //db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.Sections.Add(modelClass);
            db.SaveChanges();
            
            return modelClass.SectionId;
        }

        public void SectionUpdate(SectionModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void SectionDelete(int SectionId)
        {
            var _data = db.Sections.FirstOrDefault(x => x.SectionId == SectionId);
            db.Entry(_data).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region Page
        public List<PageModelClass> GetAllPage()
        {
            var AllPage = db.SurveyPages.Select(x => new PageModelClass
            {
                PageId = x.PageId,
                PageName = x.PageName,
                SequenceNumber = x.SequenceNumber,
                SectionId = x.SectionId
            }).ToList();

            return AllPage;
        }

        public List<PageModelClass> GetPagesBySectionId(int SectionID)
        {
            var Page = db.SurveyPages.Select(x => new PageModelClass
            {
                PageId = x.PageId,
                PageName = x.PageName,
                SequenceNumber = x.SequenceNumber,
                SectionId = x.SectionId
            }).Where(x => x.SectionId == SectionID).ToList();

            return Page;
        }

        public SurveyPage GetPageByPageId(int PageID)
        {
            var Page = db.SurveyPages.FirstOrDefault(x => x.PageId == PageID);
            return Page;
        }

        public Int64 PageInsert(SurveyPage modelClass)
        {
            Int64 ID = 0;
            if (db.SurveyPages.Count() > 0)
            {
               ID = db.SurveyPages.Max(x => x.PageId);
            }
            
            modelClass.PageId = ID + 1;
            db.SurveyPages.Add(modelClass);
            db.SaveChanges();

            return ID;
        }

        public void PageUpdate(PageModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void PageDelete(PageModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region Question
        public List<QuestionModelClass> GetAllQuestion()
        {
            var AllQuestion = db.Questions.Select(x => new QuestionModelClass
            {
                QuestionId = x.QuestionId,
                QuestionName = x.QuestionName,
                SequenceNumber = x.SequenceNumber,
                PageId = x.PageId
            }).ToList();

            return AllQuestion;
        }

        public List<QuestionModelClass> GetQuestionsByPageId(int PageID)
        {
            var Question = db.Questions.Select(x => new QuestionModelClass
            {
                QuestionId = x.QuestionId,
                QuestionName = x.QuestionName,
                SequenceNumber = x.SequenceNumber,
                PageId = x.PageId
            }).Where(x => x.PageId == PageID).ToList();

            return Question;
        }

        public Question GetQuestionsByQuestionId(int QuestionID)
        {
            var Question = db.Questions.FirstOrDefault(x => x.QuestionId == QuestionID);
            return Question;
        }

        public Int64 QuestionInsert(Question modelClass)
        {
            Int64 ID = 0;
            if (db.Questions.Count() > 0)
            {
                ID = db.Questions.Max(x => x.QuestionId);
            }
             
            modelClass.QuestionId = ID + 1;
            db.Questions.Add(modelClass);
            db.Entry(modelClass);
            db.SaveChanges();

            return ID;
        }

        public void QuestionUpdate(QuestionModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void QuestionDelete(QuestionModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region Option
        public List<OptionModelClass> GetAllOption()
        {
            var AllOption = db.Options.Select(x => new OptionModelClass
            {
                OptionId = x.OptionId,
                OptionName = x.OptionName,
                OptionTypeId = x.OptionTypeId,
                QuestionId = x.QuestionId,                
            }).ToList();

            return AllOption;
        }

        public List<OptionModelClass> GetOptionByQuestionId(int QuestionId)
        {
            var AllOption = db.Options.Select(x => new OptionModelClass
            {
                OptionId = x.OptionId,
                OptionName = x.OptionName,
                OptionTypeId = x.OptionTypeId,
                QuestionId = x.QuestionId,
            }).Where(x => x.QuestionId == QuestionId).ToList();

            return AllOption;
        }

        public Option GetOptionByOptionId(int OptionID)
        {
            var _Option = db.Options.FirstOrDefault(x => x.OptionId == OptionID);
            return _Option;
        }

        public Int64 OptionInsert(OptionModelClass modelClass)
        {
            Int64 ID = db.Options.Max(x => x.OptionId);
            modelClass.OptionId = ID + 1;
            db.Entry(modelClass);
            db.SaveChanges();

            return ID;
        }

        public void OptionUpdate(QuestionModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void OptionDelete(QuestionModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion
        
        #region OptionType
        public List<OptionTypeModelClass> GetAllOptionTypes()
        {
            var AllOptionTypes = db.OptionTypes.Select(x => new OptionTypeModelClass
            {
                OptionTypeId = x.OptionTypeId,
                OptionTypeName = x.OptionTypeName
            }).ToList();

            return AllOptionTypes;
        }
                
        public OptionType GetOptionTypeByOptionTypeId(int OptionTypeID)
        {
            var _OptionType = db.OptionTypes.FirstOrDefault(x => x.OptionTypeId == OptionTypeID);
            return _OptionType;
        }

        public byte OptionTypeInsert(OptionTypeModelClass modelClass)
        {
            byte ID = db.OptionTypes.Max(x => x.OptionTypeId);
            modelClass.OptionTypeId = Convert.ToByte(ID + 1);
            db.Entry(modelClass);
            db.SaveChanges();

            return ID;
        }
 
        public void OptionTypeUpdate(OptionTypeModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void OptionTypeDelete(OptionTypeModelClass modelClass)
        {
            db.Entry(modelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region Respondent
        public List<SurveyRespondentModelClass> GetAllRespondent()
        {
            var respondents = db.SurveyRespondents.Select(x => new SurveyRespondentModelClass
            {
                RespondentId = x.RespondentId,
                RespondentName = x.RespondentName,
                RespondentAge = x.RespondentAge,
                RespodentEmail = x.RespodentEmail,
                RespondentContact = x.RespondentContact,
                QuestionnaireId  = x.QuestionnaireId
            }).ToList();
            return respondents;
        }

        public SurveyRespondent GetRespondentById(int RespondentId)
        {
            var Respondent = db.SurveyRespondents.FirstOrDefault(x => x.RespondentId == RespondentId);
            return Respondent;
        }

        public List<SurveyRespondentModelClass> GetRespondentByQuestionnaireId(int QuestionnaireId)
        {
            var respondents = db.SurveyRespondents.Select(x => new SurveyRespondentModelClass
            {
                RespondentId = x.RespondentId,
                RespondentName = x.RespondentName,
                RespondentAge = x.RespondentAge,
                RespodentEmail = x.RespodentEmail,
                RespondentContact = x.RespondentContact,
                QuestionnaireId = x.QuestionnaireId
            }).Where(x => x.QuestionnaireId == QuestionnaireId).ToList();
            return respondents;
        }

        public Int64 RespondentInsert (SurveyRespondentModelClass ModelClass)
        {
            Int64 Id = db.SurveyRespondents.Max(x => x.RespondentId);
            ModelClass.RespondentId = Id + 1;
            db.Entry(ModelClass);
            db.SaveChanges();

            return ModelClass.RespondentId;
        }

        public void RespondentUpdate (SurveyRespondentModelClass ModelClass)
        {
            db.Entry(ModelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void RespondentDelete (SurveyRespondentModelClass ModelClass)
        {
            db.Entry(ModelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion

        #region RespondentAnswers
        public RespondentAnswer GetRespondentAnswerById(int RespondentAnswers)
        {
            var Answer = db.RespondentAnswers.FirstOrDefault(x => x.RespondentAnswerId == RespondentAnswers);
            return Answer;
        }

        public List<RespondentAnswersModelClass> GetAllAnswersByRespondentId(int RespondentAnswerId)
        {
            var Answers = db.RespondentAnswers.Select(x => new RespondentAnswersModelClass
            {
                RespondentAnswerId = x.RespondentAnswerId,
                RespondentAnswerValue = x.RespondentAnswerValue,
                OptionId = x.OptionId,
                RespondentId = x.RespondentId
            }).Where(x => x.RespondentAnswerId == RespondentAnswerId).ToList();

            return Answers;
        }

        public List<RespondentAnswersModelClass> GetAllAnswersByOptionId(int OptionId)
        {
            var Answers = db.RespondentAnswers.Select(x => new RespondentAnswersModelClass
            {
                RespondentAnswerId = x.RespondentAnswerId,
                RespondentAnswerValue = x.RespondentAnswerValue,
                OptionId = x.OptionId,
                RespondentId = x.RespondentId
            }).Where(x => x.OptionId == OptionId).ToList();

            return Answers;
        }

        public Int64 RespondentAnswerInsert(RespondentAnswer ModelClass)
        {
            Int64 Id = db.RespondentAnswers.Max(x => x.RespondentAnswerId);
            ModelClass.RespondentAnswerId = Id + 1;
            db.Entry(ModelClass);
            db.SaveChanges();
            return ModelClass.RespondentAnswerId;
        }

        public void RespondentAnswerUpdate(RespondentAnswer ModelClass)
        {
            db.Entry(ModelClass).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public void RespondentAnswerDelete(RespondentAnswer ModelClass)
        {
            db.Entry(ModelClass).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
        }
        #endregion
    }
}