using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories.Interfaces;

namespace WebApplication.Repositories
{
    public class PartRepository : IPartRepository
    {
        private readonly AutoPartsContext _dbContext;

        public PartRepository(AutoPartsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreatePart(PartModel part)
        {
            _dbContext.Parts.Add(part);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<PartModel> UpdatePart(Guid partToModifyGuid, PartModel part)
        {
            var partToModify = await _dbContext.Parts.FirstOrDefaultAsync(p => p.PartGuid == partToModifyGuid);

            if (partToModify == null)
            {
                return null;
            }

            partToModify.PartGuid = partToModifyGuid;
            var carToReference = await _dbContext.Cars.FirstOrDefaultAsync(c => c.CarGuid == part.FK_CarGuid);

            if (carToReference == null) 
            {
                return null;
            }

            partToModify.FK_CarGuid = part.FK_CarGuid;
            partToModify.Name = part.Name;
            partToModify.Price = part.Price;
            partToModify.Category = part.Category;
            partToModify.Description = part.Description;
            partToModify.ImgUrl = part.ImgUrl;

            _dbContext.Parts.Update(partToModify);

            await _dbContext.SaveChangesAsync();

            return partToModify;
        }

        public async Task<IEnumerable<PartModel>> GetAllParts()
        {
            return await _dbContext.Parts.ToListAsync();
        }

        public async Task<PartModel> GetPartByGuid(Guid partGuid)
        {
            var part = await _dbContext.Parts.FirstOrDefaultAsync(p => p.PartGuid == partGuid);
            return part;
        }

        public async Task DeletePartByGuid(Guid partGuid)
        {
            var part = await GetPartByGuid(partGuid);
            if (part != null)
            {
                _dbContext.Parts.Remove(part);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<PartWithCar>> GetAllPartsWithCars()
        {
            var partList = await GetAllParts();
            var partsWithCars = partList.Select(p =>
                                new PartWithCar
                                {
                                    Part = p,
                                    Car = _dbContext.Cars.Where(c => c.CarGuid == p.FK_CarGuid).FirstOrDefault()
                                }).ToList();

            return partsWithCars;
        }
    }
}
