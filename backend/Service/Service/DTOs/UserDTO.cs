using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Service.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        //public string? GoogleId { get; set; }
        public string? PictureUrl { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
    public class CreateUserDTO
    {
        public string? GoogleId { get; set; }
        public string? PictureUrl { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
    public class UpdateUserDTO
    {
        public string? GoogleId { get; set; }
        public string? PictureUrl { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
