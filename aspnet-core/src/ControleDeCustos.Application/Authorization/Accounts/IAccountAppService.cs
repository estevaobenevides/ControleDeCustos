using System.Threading.Tasks;
using Abp.Application.Services;
using ControleDeCustos.Authorization.Accounts.Dto;

namespace ControleDeCustos.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
