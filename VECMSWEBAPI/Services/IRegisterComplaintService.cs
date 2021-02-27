using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebApiCore_Base.Models;
using WebApiCore_Base.Framework;

namespace WebApiCoreProject.Services
{
    public interface IRegisterComplaintService
    {

        Task<DTO> GetComplaintTypeData();
        Task<DTO> GetComplaintDataByUser(long UserId);
        Task<DTO> GetComplaintDataByStatus(long StatusId, long? UserId);
        Task<DTO> GetComplaintDataById(long Id);
        Task<DTO> SaveRegisterComplaint(ComplaintRegistration obj);
        Task<FileStream> DownloadFile();
        Task<DTO> UpdateComplaint(ComplaintRegistration obj);
        Task<DTO> AssignComplaint(ComplaintRegistration obj);
    }
}
