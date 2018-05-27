using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ControleDeCustos.Funcionarios.Dto;
using ControleDeCustos.Models;

namespace ControleDeCustos.Funcionarios
{
    public class FuncionarioAppService : AsyncCrudAppService<Funcionario, FuncionarioDto, int, PagedResultRequestDto, CreateFuncionarioDto, FuncionarioDto>, IFuncionarioAppService
    {
        private readonly IFuncionarioManager _funcionarioManager;
        public FuncionarioAppService(IRepository<Funcionario> repository, IFuncionarioManager funcionarioManager)
             : base(repository)
        {
            _funcionarioManager = funcionarioManager;
        }

        public override async Task<FuncionarioDto> Create(CreateFuncionarioDto input)
        {
            var entity = ObjectMapper.Map<Funcionario>(input);
            var output = await _funcionarioManager.Create(entity);
            return MapToEntityDto(output);
        }

        public override async Task Delete(EntityDto<int> input)
        {
            await _funcionarioManager.Delete(input.Id);
        }

        public override async Task<FuncionarioDto> Update(FuncionarioDto input)
        {
            var entity = ObjectMapper.Map<Funcionario>(input);
            var output = await _funcionarioManager.Update(entity);
            return MapToEntityDto(output);
        }
    }
}
