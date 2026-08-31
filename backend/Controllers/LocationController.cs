using EnhanzerAssessment.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace EnhanzerAssessment.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly AppDbContext _context;

    public LocationController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var locations = _context.Location_Details.ToList();

        return Ok(locations);
    }
}