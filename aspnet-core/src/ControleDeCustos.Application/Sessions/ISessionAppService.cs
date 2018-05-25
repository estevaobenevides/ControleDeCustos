using System.Threading.Tasks;
using Abp.Application.Services;
using ControleDeCustos.Sessions.Dto;

namespace ControleDeCustos.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
