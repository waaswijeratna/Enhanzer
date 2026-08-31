using EnhanzerAssessment.Api.Data;
using EnhanzerAssessment.Api.Models;
using EnhanzerAssessment.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EnhanzerAssessment.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ExternalApiService _externalApiService;
    private readonly AppDbContext _context;

    public AuthController(
        ExternalApiService externalApiService,
        AppDbContext context)
    {
        _externalApiService = externalApiService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        ExternalLoginRequest request)
    {
        var result = await _externalApiService.LoginAsync(request);

        if (result == null ||
            result.Response_Body == null ||
            result.Response_Body.Count == 0)
        {
            return Unauthorized("Invalid email or password.");
        }

        var userResponse = result.Response_Body[0];
        var userLocations = userResponse.User_Locations ?? new List<ExternalLocation>();

        var invalidLoginMessage = userResponse.Doc_Msg ?? string.Empty;
        var isInvalidCreds = !string.IsNullOrWhiteSpace(invalidLoginMessage)
            || string.IsNullOrWhiteSpace(userResponse.User_Code)
            || string.IsNullOrWhiteSpace(userResponse.Email)
            || userLocations.Count == 0;

        if (isInvalidCreds)
        {
            return Unauthorized("Invalid email or password.");
        }

        foreach (var location in userLocations)
        {
            var exists = _context.Location_Details
                .Any(x => x.Location_Code == location.Location_Code);

            if (!exists)
            {
                _context.Location_Details.Add(new Location
                {
                    Location_Code = location.Location_Code,
                    Location_Name = location.Location_Name
                });
            }
        }

        await _context.SaveChangesAsync();

        var normalizedResponse = new
        {
            status_Code = result.Status_Code,
            sync_Time = result.Sync_Time,
            message = result.Message,
            response_Body = new[]
            {
                new
                {
                    user_Code = userResponse.User_Code,
                    user_Display_Name = userResponse.User_Display_Name,
                    email = userResponse.Email,
                    company_Code = userResponse.Company_Code,
                    user_Locations = userLocations.Select(l => new
                    {
                        location_Code = l.Location_Code,
                        location_Name = l.Location_Name
                    }).ToList()
                }
            }
        };

        return Ok(normalizedResponse);
    }
}