using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.Departamentos.Dto;

namespace ControleDeCustos.Departamentos
{
    public interface IDepartamentoAppService : IAsyncCrudAppService<DepartamentoDto, int, PagedResultRequestDto, CreateDepartamentoDto, DepartamentoDto>
    {
    }
}
