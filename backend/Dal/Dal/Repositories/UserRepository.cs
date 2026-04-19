using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dal.Repositories
{
    public interface IUserRepository: IBaseRepository<User>
    {
        Task<User> GetByEmailAsync(string email);
    }

    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly ProjectContext _context;
        public UserRepository(ProjectContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
