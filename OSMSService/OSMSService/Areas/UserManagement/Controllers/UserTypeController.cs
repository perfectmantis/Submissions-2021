using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSMSService.Controllers;
using OSMSService.Areas.UserManagement.Models;

namespace OSMSService.Areas.UserManagement.Controllers
{
    public class UserTypeController : BaseController
    {
        // GET: UserManagement/User
        public List<UserTypeModelClass> GetUsers()
        {
            var userTypes = db.UserTypes.Select(x => new UserTypeModelClass()
            {
                UserTypeId = x.UserTypeId,                
                UserTypeName = x.UserTypeName
            }).ToList();

            return userTypes;
        }

        public byte Insert(UserTypeModelClass ModelClass)
        {
            byte maxId = db.UserTypes.Max(x => x.UserTypeId);
            ModelClass.UserTypeId = Convert.ToByte(maxId + 1);
            db.Entry(ModelClass);
            db.SaveChanges();
            return ModelClass.UserTypeId;
        }

        public void Update(UserTypeModelClass ModelClass)
        {
            try
            {
                db.Entry(ModelClass).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Delete(UserTypeModelClass ModelClass)
        {
            try
            {
                db.Entry(ModelClass).State = System.Data.Entity.EntityState.Deleted;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}