namespace GoTravel.API.Entities
{
    public class ChatMessage
    {
        public int Id { get; set; }
        
        public int ConversationId { get; set; }
        public ChatConversation Conversation { get; set; } = null!;

        public string Role { get; set; } = "user"; // user, assistant, system, tool
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? TokenCount { get; set; }
    }
}
