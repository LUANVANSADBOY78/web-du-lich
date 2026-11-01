using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.DTOs;
using StudentManagement.Services;

namespace StudentManagement.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService authService;
    private readonly IPatientManager patientManager;
    private readonly IJwtTokenService jwtTokenService;

    public AuthController(IAuthService authService, IPatientManager patientManager, IJwtTokenService jwtTokenService)
    {
        this.authService = authService;
        this.patientManager = patientManager;
        this.jwtTokenService = jwtTokenService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public ActionResult<UserDto> Register(RegisterDto register)
    {
        try
        {
            var user = authService.Register(register);
            patientManager.Add(new StudentManagement.Models.Patient
            {
                UserId = user.Id,
                FullName = register.FullName.Trim(),
                DateOfBirth = register.DateOfBirth,
                Phone = register.Phone.Trim(),
                Address = register.Address.Trim(),
                MedicalHistory = "Chưa cập nhật"
            });
            return Created("/api/auth/me", user);
        }
        catch (InvalidOperationException exception)
        {
            return Conflict(new { message = exception.Message });
        }
    }

    [Authorize]
    [HttpPost("change-password")]
    public ActionResult<UserDto> ChangePassword(ChangePasswordDto password)
    {
        try
        {
            var user = authService.ChangePassword(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!), password.CurrentPassword, password.NewPassword);
            return Ok(user);
        }
        catch (UnauthorizedAccessException exception) { return Unauthorized(new { message = exception.Message }); }
        catch (KeyNotFoundException exception) { return NotFound(new { message = exception.Message }); }
    }

    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public IActionResult ForgotPassword(ForgotPasswordDto request)
    {
        // Do not reveal whether an account exists. Email delivery can be wired in later.
        _ = authService.UserExists(request.UsernameOrEmail);
        return Ok(new { message = "Nếu tài khoản tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi qua email." });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto login)
    {
        var user = authService.Login(login);
        if (user is null)
            return Unauthorized(new { message = "Tên đăng nhập hoặc mật khẩu không đúng." });

        if (user.Role == "Doctor")
        {
            var db = HttpContext.RequestServices.GetRequiredService<StudentManagement.Data.AppDbContext>();
            var doc = db.Doctors.FirstOrDefault(d => d.UserId == user.Id);
            if (doc != null)
            {
                user.DoctorId = doc.Id;
            }
            else if (user.DoctorId.HasValue)
            {
                var docById = db.Doctors.FirstOrDefault(d => d.Id == user.DoctorId.Value);
                if (docById != null && docById.UserId == null)
                {
                    docById.UserId = user.Id;
                    db.SaveChanges();
                }
            }
            else
            {
                var firstAvailableDoc = db.Doctors.FirstOrDefault(d => d.IsActive && d.UserId == null) 
                                     ?? db.Doctors.FirstOrDefault(d => d.IsActive);
                if (firstAvailableDoc != null)
                {
                    user.DoctorId = firstAvailableDoc.Id;
                    firstAvailableDoc.UserId = user.Id;
                    var u = db.Users.Find(user.Id);
                    if (u != null) u.DoctorId = firstAvailableDoc.Id;
                    db.SaveChanges();
                }
            }
        }

        user.AccessToken = jwtTokenService.CreateToken(user);
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.GivenName, user.FullName),
            new(ClaimTypes.Role, user.Role)
        };
        if (user.DoctorId.HasValue)
            claims.Add(new Claim("doctor_id", user.DoctorId.Value.ToString()));

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)),
            new AuthenticationProperties { IsPersistent = true, ExpiresUtc = DateTimeOffset.UtcNow.AddHours(8) });

        return Ok(user);
    }

    [Authorize]
    [HttpGet("me")]
    public ActionResult<object> Me()
    {
        int? docId = null;
        if (int.TryParse(User.FindFirstValue("doctor_id"), out var doctorId) && doctorId > 0)
        {
            docId = doctorId;
        }
        else if (User.IsInRole("Doctor") && int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var uid))
        {
            var db = HttpContext.RequestServices.GetRequiredService<StudentManagement.Data.AppDbContext>();
            var doc = db.Doctors.FirstOrDefault(d => d.UserId == uid);
            if (doc != null) docId = doc.Id;
        }

        int rewardPoints = 0;
        if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
        {
            var db = HttpContext.RequestServices.GetRequiredService<StudentManagement.Data.AppDbContext>();
            var u = db.Users.Find(userId);
            if (u != null) rewardPoints = u.RewardPoints;
        }

        return Ok(new
        {
            id = User.FindFirstValue(ClaimTypes.NameIdentifier),
            username = User.Identity?.Name,
            fullName = User.FindFirstValue(ClaimTypes.GivenName),
            role = User.FindFirstValue(ClaimTypes.Role),
            doctorId = docId,
            rewardPoints = rewardPoints
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return NoContent();
    }
}