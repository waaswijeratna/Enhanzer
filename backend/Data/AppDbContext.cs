using EnhanzerAssessment.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EnhanzerAssessment.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Location> Location_Details { get; set; }
}