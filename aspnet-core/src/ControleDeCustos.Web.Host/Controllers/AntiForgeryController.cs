using Microsoft.AspNetCore.Antiforgery;
using ControleDeCustos.Controllers;

namespace ControleDeCustos.Web.Host.Controllers
{
    public class AntiForgeryController : ControleDeCustosControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
