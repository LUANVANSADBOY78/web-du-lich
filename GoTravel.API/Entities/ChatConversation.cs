namespace GoTravel.API.Entities
{
    public class ChatConversation
    {
        public int Id { get; set; }
        public int? UserId { get; set; } // Nullable for guest chats
        public User? User { get; set; }
        
        public string? SessionId { get; set; } // For guest users
        public string Title { get; set; } = "Cuộc trò chuyện mới";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public bool IsDeleted { get; set; } = false;

        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}
