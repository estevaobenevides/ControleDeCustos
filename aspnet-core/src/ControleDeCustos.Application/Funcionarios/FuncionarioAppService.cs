using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ControleDeCustos.Departamentos.Dto;
using ControleDeCustos.Funcionarios.Dto;
using ControleDeCustos.Managers;
using ControleDeCustos.Models;

namespace ControleDeCustos.Funcionarios
{
    public class FuncionarioAppService : AsyncCrudAppService<Funcionario, FuncionarioDto, int, PagedResultRequestDto, CreateFuncionarioDto, FuncionarioDto>, IFuncionarioAppService
    {
        private readonly IFuncionarioManager _funcionarioManager;
        private readonly IDepartamentoManager _departamentoManager;

        public FuncionarioAppService(
            IRepository<Funcionario> repository,
            IFuncionarioManager funcionarioManager,
            IDepartamentoManager departamentoManager
            ) : base(repository)
        {
            _funcionarioManager = funcionarioManager;
            _departamentoManager = departamentoManager;
        }

        public async Task<ListResultDto<DepartamentoDto>> GetAllDepartamentos()
        {
            var entity = await _departamentoManager.GetAllList();
            return new ListResultDto<DepartamentoDto>(ObjectMapper.Map<List<DepartamentoDto>>(entity));
        }

        public async Task<ListResultDto<DepartamentoDto>> GetDepartamentosById(EntityDto<int> input)
        {
            var entity = await _departamentoManager.GetAllByFuncionario(input.Id);
            return new ListResultDto<DepartamentoDto>(ObjectMapper.Map<List<DepartamentoDto>>(entity));
        }

        public override async Task<FuncionarioDto> Create(CreateFuncionarioDto input)
        {
            var entity = ObjectMapper.Map<Funcionario>(input);
            entity.Departamentos = input.DepartamentoIds
                .Select(d => new FuncionarioDepartamento { DepartamentoId = d }).ToList();
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
            entity.Departamentos = input.DepartamentoIds
                .Select(d => new FuncionarioDepartamento { DepartamentoId = d }).ToList();
            var output = await _funcionarioManager.Update(entity);
            return MapToEntityDto(output);
        }

        protected override IQueryable<Funcionario> CreateFilteredQuery(PagedResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Departamentos).Where(f => !f.IsDeleted);
        }

        protected override FuncionarioDto MapToEntityDto(Funcionario entity)
        {
            var output = base.MapToEntityDto(entity);
            output.DepartamentoIds = entity.Departamentos?.Select(d => d.DepartamentoId).ToArray();
            return output;
        }

        protected override void MapToEntity(FuncionarioDto updateInput, Funcionario entity)
        {
            base.MapToEntity(updateInput, entity);
            updateInput.DepartamentoIds = entity.Departamentos?.Select(d => d.DepartamentoId).ToArray();
        }
    }
}
