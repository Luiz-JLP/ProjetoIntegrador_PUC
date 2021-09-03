using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PinguinoApp.API.Interface;
using PinguinoApp.API.Models;
using PinguinoApp.API.Repositories;

namespace PinguinoApp.API.Services
{
    public class AuthenticationService : ControllerBase
    {
        ITokenService tokenService;

        public AuthenticationService(ITokenService tokenService)
        {
            this.tokenService = tokenService;
        }

        public async Task<ActionResult<dynamic>> Login(Login login)
        {
            User user = UsersRepository.GetUser(login.UserName);

            if (user == null)
                return NotFound("Usuário ou Senha Inválidos");

            if (string.Equals(login.Password, user.Password))
            {
                return Ok(tokenService.GenerateToken(user));
            }
            else
            {
                return Unauthorized("Usuário ou Senha Inválidos");
            }
        }
    }
}
