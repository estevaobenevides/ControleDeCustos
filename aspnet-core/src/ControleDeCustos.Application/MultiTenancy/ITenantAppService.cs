using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.MultiTenancy.Dto;

namespace ControleDeCustos.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
