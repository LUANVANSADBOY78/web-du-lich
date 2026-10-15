using GoTravel.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace GoTravel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToursController : ControllerBase
    {
        private readonly GoTravelDbContext _context;

        public ToursController(GoTravelDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTours()
        {
            var tours = await _context.Tours.Include(t => t.Images).ToListAsync();
            return Ok(tours);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTour(int id)
        {
            var tour = await _context.Tours
                .Include(t => t.Images)
                .Include(t => t.Itineraries)
                .Include(t => t.Highlights)
                .FirstOrDefaultAsync(t => t.Id == id);
                
            if (tour == null) return NotFound();
            return Ok(tour);
        }
    }
}
