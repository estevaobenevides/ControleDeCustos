using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ControleDeCustos.Controllers
{
    public abstract class ControleDeCustosControllerBase: AbpController
    {
        protected ControleDeCustosControllerBase()
        {
            LocalizationSourceName = ControleDeCustosConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
