using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PinguinoApp.API.Models;
using PinguinoApp.API.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Controllers
{
    [ApiController]
    [Route("v1/newsletter")]
    public class NewsletterController : Controller
    {
        NewsletterService service;

        public NewsletterController(NewsletterService service)
        {
            this.service = service;
        }

        [HttpPost("subscription")]
        [Authorize]
        public async Task<ActionResult<dynamic>> Subscription([FromBody] Newsletter newsletter)
        {
            return Ok(await service.Subscription(newsletter));
        }

        [HttpPost("unsubscription")]
        [Authorize]
        public async Task<ActionResult<dynamic>> Unsubscription([FromBody] Newsletter newsletter)
        {
            return Ok(await service.Unsubscription(newsletter));
        }

        [HttpGet]
        public async Task<ActionResult<List<Newsletter>>> SelectAll([FromQuery] Newsletter newsletter)
        {
            var usuarios = await service.
            return Ok(usuarios);
        }
    }
}
