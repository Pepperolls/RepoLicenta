using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories.Interfaces
{
    public interface IPartRepository
    {
        Task CreatePart(PartModel part);
        Task<PartModel> UpdatePart(Guid partToModifyGuid, PartModel part);
        Task<IEnumerable<PartModel>> GetAllParts();
        Task<PartModel> GetPartByGuid(Guid partGuid);
        Task DeletePartByGuid(Guid partGuid);
        Task<IEnumerable<PartWithCar>> GetAllPartsWithCars();
    }
}