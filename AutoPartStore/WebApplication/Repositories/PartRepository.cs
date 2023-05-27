using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;

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

        public async Task<IEnumerable<PartModel>> GetAllParts()
        {
            return await _dbContext.Parts.ToListAsync();
        }

        public async Task<PartModel> GetPartByGuid(Guid partGuid)
        {
            var part = await _dbContext.Parts.FirstOrDefaultAsync(p => p.PartGuid == partGuid);
            return await Task.FromResult(part);
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
