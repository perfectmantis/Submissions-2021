using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WPS.Models;
using WPS.WPSService;

namespace WPS.Controllers
{
    public class AccountTypeController : Controller
    {
        WPSServiceModel dbUser = new WPSServiceModel();
        Utility utility = new Utility();

        [Decrypted]

        #region Account Type
        public ActionResult AccountTypeIndex()
        {
            var respActType = dbUser.GetAllActType().ToList();
            return View(respActType);
        }
        [Decrypted]
        public ActionResult AccountType(int Code)
        {
            if (Code > 0)
            {
                var respActType = dbUser.GetAllActTypeById(Code);
                return View(respActType);
            }
            return View();
        }

        [HttpPost]
        [Decrypted]
        public ActionResult AccountType(int? user, SMIM_AccountType_ST actype)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                if (actype.ID > 0)
                {
                    actype.IDSpecified = true;
                    int maxValue = dbUser.UpdateActType(actype);
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully updated.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                else
                {
                    actype.IDSpecified = true;                   
                    int maxValue = dbUser.InsertActType(actype);
                    actype.ID = maxValue;
                    if (maxValue > 0)
                    {
                        strMessage = "Record successfully saved.";
                        _success = true;
                    }
                    else
                    {
                        strMessage = "Application server error.";
                    }

                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Account Type Insert/Edit", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }
        }

        [HttpPost]
        [Decrypted]
        public ActionResult DeleteAccountType(int Code)
        {
            try
            {
                string strMessage = "";
                bool _success = false;
                var AcType = dbUser.GetAllActTypeById(Code);
                int maxValue = dbUser.DeleteActType(AcType);
                if (maxValue > 0)
                {
                    strMessage = "Record successfully deleted.";
                    _success = true;
                }
                else
                {
                    strMessage = "Application server error.";
                }
                return Json(new { success = _success, response = strMessage });
            }
            catch (Exception ex)
            {
                Log.LogWrite(ex.Message, "Account Type Delete", ex);
                return Json(new { success = false, response = ex.Message.ToString() });
            }

        }
        #endregion

    }
}