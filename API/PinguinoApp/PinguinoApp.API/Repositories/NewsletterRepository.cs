using PinguinoApp.API.Models;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class NewsletterRepository
    {
        public async Task<bool> Subscription(Newsletter newsletter)
        {
            return true;
        }

        public async Task<bool> Unsubscription(Newsletter newsletter)
        {
            return true;
        }
    }
}
