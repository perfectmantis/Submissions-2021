//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebApiCore_Base.Framework;
using WebApiCore_Base.Models;
using WebApiCoreProject.Framework;

namespace WebApiCoreProject.Services
{
    public class RegisterComplaintService : BLBase<ComplaintRegistration>, IRegisterComplaintService
    {

        private readonly IHostingEnvironment _hostingEnvironment;
        public RegisterComplaintService(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        public async Task<DTO> GetComplaintTypeData()
        {

            var data = await ComplaintType.ToListAsync();
            return SuccessResponse(data);
        }

        protected override bool IsValidBeforeSave()
        {
            return ErrorList.Count == 0 ? true : false;
        }

        //public async Task<IAsyncResult> SaveRegisterComplaint()
        //{
        //    try
        //    {
        //        string firstName = HttpContext
        //     //   string lastName = HttpContext.Request.Form["lastname"];

        //        Current = await Category.Where(o => o.Id == category.Id).FirstOrDefaultAsync();
        //        if (Current == null)
        //            New();
        //        else
        //            PrimaryKeyValue = Current.Id;

        //        Current.CategoryName = category.CategoryName;
        //        Current.Description = category.Description;

        //        //foreach (var item in state.Relationships)
        //        //{
        //        //    var relationship = new Relationships();
        //        //    if (item.PkId > 0)
        //        //        relationship = Relationships.Where(o => o.PkId == item.PkId).FirstOrDefault();

        //        //    relationship.Name = item.Name;
        //        //    patient.Relationships.Add(relationship);
        //        //  }

        //        await Save();
        //        return SuccessResponse("Submit Successfully");
        //    }
        //    catch (Exception Ex)
        //    {
        //        if (ErrorList.Count > 0)
        //            return this.BadResponse(ErrorList);
        //        else
        //            return this.BadResponse(Ex.Message);
        //    }
        //}

        public async Task<DTO> SaveRegisterComplaint(ComplaintRegistration complain)
        {
            try
            {

                int? complainno = 0;
                Current = await ComplaintRegistration.Where(o => o.Id == complain.Id).FirstOrDefaultAsync();
                if (Current == null)
                {
                    complainno = ComplaintRegistration.Where(sa => sa.Id != 0).OrderByDescending(a => a.Id).FirstOrDefault().NewIfEmpty().ComplaintNo;
                    if (complainno != null)
                        complainno++;
                    else
                        complainno = 1;
                    New();
                    Current.AddBy = complain.AddBy.ToInt();
                }
                else
                    PrimaryKeyValue = Current.Id;

                Current.ComplaintNo = complainno;
                Current.CategoryId = complain.CategoryId.ToInt();
                Current.SubCategoryId = complain.SubCategoryId.ToInt();
                Current.ComplaintTypeId = complain.ComplaintTypeId.ToInt();
                Current.ComplaintStatusId = Enums.ComplaintStatusId.Pending.ToInt();
                Current.StateId = complain.StateId.ToInt();
                Current.ComplaintNature = complain.ComplaintNature.ToStr();
                Current.ComplaintWord = complain.ComplaintWord.ToStr();
                Current.ComplaintDocName = complain.ComplaintDocName.ToStr();
                Current.ComplaintDocPath = complain.ComplaintDocPath.ToStr();
                Current.ComplaintAssignedTo = 0;



                await Save();
                return SuccessResponse("Submit Successfully");
            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> GetComplaintDataByUser(long UserId)
        {
            // var data = await ComplaintRegistration.Where(a=>a.AddBy == UserId).ToListAsync();
            try
            {
                string[] str = { "UserId" };
                DataTable data = General.ExecuteADOSp("sp_GetComplaintDataByUser", str, UserId);
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }

        }

        public async Task<DTO> GetComplaintDataByStatus(long StatusId,long? UserId)
        {
           
            try
            {
                if (UserId == null)
                    UserId = 0;
                string[] str = { "ComplaintStatusId", "UserId" };
                DataSet data = General.ExecuteADOSpE("sp_GetComplaintDataByStatus", str, StatusId, UserId);
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }

        }

        public async Task<DTO> GetComplaintDataById(long Id)
        {

            try
            {
                string[] str = { "Id" };
                DataTable data = General.ExecuteADOSp("sp_GetComplaintDataById", str, Id);
                return SuccessResponse(data);
            }
            catch (Exception Ex)
            {

                return BadResponse(Ex.Message);
            }

        }


        public async Task<FileStream> DownloadFile()
        {
            var currentDirectory = System.IO.Directory.GetCurrentDirectory();
            currentDirectory = currentDirectory + "\\Documents\\";
            var file = Path.Combine(Path.Combine(currentDirectory, "attachments"), "MUHAMMAD SHAHZAD Resume.pdf");
            return new FileStream(file, FileMode.Open, FileAccess.Read);
        }

        public async Task<DTO> UpdateComplaint(ComplaintRegistration complain)
        {
            try
            {

              //  int? complainno = 0;
                Current = await ComplaintRegistration.Where(o => o.Id == complain.Id).FirstOrDefaultAsync();
                if (Current != null)
                {
                    PrimaryKeyValue = Current.Id;

                    Current.EditBy = complain.EditBy.ToInt();
                    Current.ComplaintStatusId = complain.ComplaintStatusId.ToInt();
                    Current.ComplaintRemarks = complain.ComplaintRemarks.ToStr();



                    await Save();
                }
                return SuccessResponse("Submit Successfully");
            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }
        }

        public async Task<DTO> AssignComplaint(ComplaintRegistration complain)
        {
            try
            {

                //  int? complainno = 0;
                Current = await ComplaintRegistration.Where(o => o.Id == complain.Id).FirstOrDefaultAsync();
                if (Current != null)
                {
                    PrimaryKeyValue = Current.Id;

                    Current.EditBy = complain.EditBy.ToInt();
                    Current.ComplaintAssignedTo = complain.ComplaintAssignedTo.ToInt();
                    //Current.ComplaintRemarks = complain.ComplaintRemarks.ToStr();



                    await Save();
                }
                return SuccessResponse("Submit Successfully");
            }
            catch (Exception Ex)
            {
                if (ErrorList.Count > 0)
                    return this.BadResponse(ErrorList);
                else
                    return this.BadResponse(Ex.Message);
            }
        }

    }
}
