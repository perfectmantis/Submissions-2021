using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using OSMSService.Controllers;
using OSMSService.Areas.UserManagement.Models;
using OSMSService.Models;
using System.Data.Entity.Validation;

namespace OSMSService.Areas.UserManagement.Controllers
{
    public class UserController : BaseController
    {
        // GET: UserManagement/User
        public List<UserModelClass> GetUsers()
        {
            var users = db.UserInfoes.Select(x => new UserModelClass()
            {
                UserId = x.UserId,
                Name = x.Name,
                FatherName = x.FatherName,
                UserAddress = x.UserAddress,
                Cnic = x.Cnic,
                Email = x.Email,
                Department = x.Department,
                Organization = x.Organization,
                UserType = x.UserType
            }).ToList();

            return users;
        }

        public UserModelClass GetUserById(int UserId)
        {
            var users = db.UserInfoes.Select(x => new UserModelClass()
            {
                UserId = x.UserId,
                Name = x.Name,
                FatherName = x.FatherName,
                UserAddress = x.UserAddress,
                LoginPassword = x.LoginPassword,
                Cnic = x.Cnic,
                Email = x.Email,
                Department = x.Department,
                Organization = x.Organization,
                UserType = x.UserType
            }).Where(x => x.UserId == UserId).FirstOrDefault();

            return users;
        }

        [System.Web.Http.HttpPost]
        public UserInfo Insert(UserInfo ModelClass)
        {
            int maxId = 0;
            maxId = db.UserInfoes.Max(x => x.UserId);
            if (maxId < 1)
                maxId = 0;
            else                
                ModelClass.UserId = maxId + 1;
            ModelClass.UserType = 1;
            db.UserInfoes.Add(ModelClass);
            db.SaveChanges();
            return ModelClass;
        }

        public void Update(UserInfo ModelClass)
        {
            try
            {
                 db.Entry(ModelClass).State = System.Data.Entity.EntityState.Modified;
                //db.UserInfoes.Add(ModelClass);// = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var errors in ex.EntityValidationErrors)
                {
                    foreach (var validationError in errors.ValidationErrors)
                    {
                        // get the error message 
                        string errorMessage = validationError.ErrorMessage;
                    }
                }
            }
        }

        public void Delete(UserModelClass ModelClass)
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


        [System.Web.Http.HttpGet]
        public string UpdatePassword(int UserId, string OldPassword, String NewPassword)
        {
            string message = "";
            try
            {                
                var user = db.UserInfoes.Where(x => x.UserId == UserId).FirstOrDefault();                
                if (user.LoginPassword == OldPassword)
                {
                    user.LoginPassword = NewPassword;
                    db.Entry(user).State = System.Data.Entity.EntityState.Modified;                    
                    db.SaveChanges();
                    message = "Your password has been updated.";                                        
                }
                else
                {
                    return "Old password is not correct. Please enter a valid old password.";
                }
                                
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var errors in ex.EntityValidationErrors)
                {
                    foreach (var validationError in errors.ValidationErrors)
                    {
                        // get the error message 
                        message = validationError.ErrorMessage;
                    }
                }
            }
            return message;
        }

        [System.Web.Http.HttpPost]
        public int Checkuser (UserModelClass modelClass)
        {           
            try
            {
                if (modelClass.Name != null && modelClass.Name != "" && modelClass.LoginPassword != null && modelClass.LoginPassword != "")
                {
                    var user = db.UserInfoes.Where(x => x.Name == modelClass.Name).FirstOrDefault();
                    if (user != null && user.LoginPassword == modelClass.LoginPassword)
                    {
                        return user.UserId;
                    }
                    else
                    {
                        return 0;
                    }
                }
                else
                {
                    return 0;
                }
            }
            catch (DbEntityValidationException ex)
            {
                foreach (var errors in ex.EntityValidationErrors)
                {
                    foreach (var validationError in errors.ValidationErrors)
                    {
                        // get the error message 
                        string message = validationError.ErrorMessage;
                    }
                }
            }
            return 0;
        }
    }
}