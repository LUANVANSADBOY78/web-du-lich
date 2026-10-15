using GoTravel.API.Data;
using GoTravel.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace GoTravel.API.Controllers
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class AdminToursController : ControllerBase
    {
        private readonly GoTravelDbContext _context;

        public AdminToursController(GoTravelDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTour([FromBody] Tour tour)
        {
            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTour", "Tours", new { id = tour.Id }, tour);
        }
    }
}
