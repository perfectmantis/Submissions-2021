using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OSMS.Areas.QuestionnaireManagement.Models
{
    public class UserAndQuestionnaireVM
    {
        OSMS.Areas.UserManagement.Models.UserModelClass User = new UserManagement.Models.UserModelClass();
        OSMS.Areas.QuestionnaireManagement.Models.QuestionnaireModelClass Questionnaire = new QuestionnaireModelClass();
    }
}