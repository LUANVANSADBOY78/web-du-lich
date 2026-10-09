using GoTravel.API.Data;
using GoTravel.API.Entities;
using GoTravel.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GoTravel.API.Controllers
{
    [Route("api/ai/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly GoTravelDbContext _context;
        private readonly IAIService _aiService;

        public ChatController(GoTravelDbContext context, IAIService aiService)
        {
            _context = context;
            _aiService = aiService;
        }

        public class ChatRequest
        {
            public int? ConversationId { get; set; }
            public string Message { get; set; } = string.Empty;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest("Message is required.");
            }

            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
            {
                var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(idClaim, out int id))
                {
                    userId = id;
                }
            }

            ChatConversation conversation;

            if (request.ConversationId.HasValue && request.ConversationId > 0)
            {
                conversation = await _context.ChatConversations.FindAsync(request.ConversationId.Value);
                if (conversation == null)
                {
                    return NotFound("Conversation not found.");
                }
            }
            else
            {
                // Create new
                conversation = new ChatConversation
                {
                    UserId = userId,
                    Title = request.Message.Length > 30 ? request.Message.Substring(0, 30) + "..." : request.Message
                };
                _context.ChatConversations.Add(conversation);
                await _context.SaveChangesAsync();
            }

            // Save User Message
            var userMsg = new ChatMessage
            {
                ConversationId = conversation.Id,
                Role = "user",
                Content = request.Message
            };
            _context.ChatMessages.Add(userMsg);
            await _context.SaveChangesAsync();

            // Get AI Response from Abstraction
            string aiText = await _aiService.GetChatResponseAsync(request.Message, conversation.Id);

            // Save AI Message
            var aiMsg = new ChatMessage
            {
                ConversationId = conversation.Id,
                Role = "assistant",
                Content = aiText
            };
            _context.ChatMessages.Add(aiMsg);
            
            conversation.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                conversationId = conversation.Id,
                messageId = aiMsg.Id,
                content = aiText
            });
        }
    }
}
