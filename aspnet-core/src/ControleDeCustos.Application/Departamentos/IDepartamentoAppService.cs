using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.Departamentos.Dto;
using ControleDeCustos.Funcionarios.Dto;
using System.Threading.Tasks;

namespace ControleDeCustos.Departamentos
{
    public interface IDepartamentoAppService : IAsyncCrudAppService<DepartamentoDto, int, PagedResultRequestDto, CreateDepartamentoDto, DepartamentoDto>
    {
        Task<ListResultDto<FuncionarioDto>> GetFuncionarios(EntityDto<int> input);
    }
}
