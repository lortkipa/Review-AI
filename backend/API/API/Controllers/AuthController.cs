using Azure.Core;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.DTOs;
using Service.Helpers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IUserService _userService;
        private readonly IConfiguration _config;

        public AuthController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("Google")]
        public async Task<ActionResult<AuthResponseDTO>> GoogleAuth([FromBody] string googleId)
        {
            if (string.IsNullOrEmpty(googleId))
                return BadRequest("Token is missing");

            var payload = await GoogleJsonWebSignature.ValidateAsync(googleId);

            var user = await _userService.GetByEmailAsync(payload.Email);
            if (user == null)
            {
                CreateUserDTO model = new CreateUserDTO
                {
                    GoogleId = payload.Subject,
                    PictureUrl = payload.Picture,
                    FullName = payload.Name,
                    Email = payload.Email
                };
                user = await _userService.AddAsync(model);
            }

            var token = TokenHelper.GenerateToken(user.Id, payload.Email, _config);
            HttpContext.Response.Cookies.Append("Token", token);

            return Ok(new AuthResponseDTO { Success = true, Message = token });
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
            HttpContext.Response.Cookies.Delete("Token");
            return Ok();
        }
    }
}
