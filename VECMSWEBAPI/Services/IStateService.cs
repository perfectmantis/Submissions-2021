using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCore_Base.Models;
using WebApiCore_Base.Framework;
namespace WebApiCoreProject.Services
{
    public interface IStateService
    {
       
        Task<DTO> GetStateData();
        Task<DTO> SaveState(State state);
        Task<DTO> DeleteStateData(long Id);
    }
}
