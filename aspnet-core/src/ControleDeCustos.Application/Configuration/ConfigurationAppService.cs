using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ControleDeCustos.Configuration.Dto;

namespace ControleDeCustos.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ControleDeCustosAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
