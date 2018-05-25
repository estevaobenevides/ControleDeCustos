using System.Threading.Tasks;
using ControleDeCustos.Configuration.Dto;

namespace ControleDeCustos.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
