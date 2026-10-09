namespace GoTravel.API.Services
{
    public interface IAIService
    {
        Task<string> GetChatResponseAsync(string message, int conversationId);
    }
}
