using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.Funcionarios.Dto;

namespace ControleDeCustos.Funcionarios
{
    public interface IFuncionarioAppService : IAsyncCrudAppService<FuncionarioDto, int, PagedResultRequestDto, CreateFuncionarioDto, FuncionarioDto>
    {
    }
}
