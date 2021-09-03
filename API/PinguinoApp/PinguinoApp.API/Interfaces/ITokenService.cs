using PinguinoApp.API.Models;

namespace PinguinoApp.API.Interface
{
    public interface ITokenService
    {
        dynamic GenerateToken(User user);
    }
}
