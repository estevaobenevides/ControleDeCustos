using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.Departamentos.Dto;
using ControleDeCustos.Funcionarios.Dto;
using System.Threading.Tasks;

namespace ControleDeCustos.Funcionarios
{
    public interface IFuncionarioAppService : IAsyncCrudAppService<FuncionarioDto, int, PagedResultRequestDto, CreateFuncionarioDto, FuncionarioDto>
    {
        Task<ListResultDto<DepartamentoDto>> GetAllDepartamentos();
        Task<ListResultDto<DepartamentoDto>> GetDepartamentosById(EntityDto<int> input);
    }
}
