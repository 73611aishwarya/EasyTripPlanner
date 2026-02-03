using EasyTripPlanner.Data;
using EasyTripPlanner.Dtos;
using EasyTripPlanner.Models;
using EasyTripPlanner.Services;
using Microsoft.AspNetCore.Mvc;

namespace EasyTripPlanner.Controllers



{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (user == null)
                return Unauthorized("Invalid credentials");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials");

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email
                }
            });
        }

        // SIGNUP
        [HttpPost("signup")]
        public IActionResult SignUp(SignUpDto dto)
        {
            if (_context.Users.Any(u => u.Email == dto.Email))
                return BadRequest("User already exists");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            var token = _jwtService.GenerateToken(user);

            return Ok(new { token });
        }
    }
}