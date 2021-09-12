using PinguinoApp.API.Models;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class NewsletterRepository
    {
        public async Task<bool> Subscription(Newsletter newsletter)
        {
            string sql = @"INSERT INTO Newsletter (email, nome)VALUES(@email, @nome);";
        }

        public async Task<bool> Unsubscription(Newsletter newsletter)
        {
            return true;
        }
    }
}
