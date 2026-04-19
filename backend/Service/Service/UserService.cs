using AutoMapper;
using Dal.Repositories;
using Data.Entities;
using Service.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
    public interface IUserService
    {
        Task<UserDTO> GetByIdAsync(int id);
        Task<UserDTO> GetByEmailAsync(string email);
        Task<UserDTO> AddAsync(CreateUserDTO model);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<UserDTO> GetByIdAsync(int id)
        {
            var entity = await _userRepo.GetByIdAsync(id);
            return _mapper.Map<UserDTO>(entity);
        }

        public async Task<UserDTO> GetByEmailAsync(string email)
        {
            var entity = await _userRepo.GetByEmailAsync(email);
            return _mapper.Map<UserDTO>(entity);
        }

        public async Task<UserDTO> AddAsync(CreateUserDTO model)
        {
            var entity = _mapper.Map<User>(model);
            return _mapper.Map<UserDTO>(await _userRepo.AddAsync(entity));
        }
    }
}
