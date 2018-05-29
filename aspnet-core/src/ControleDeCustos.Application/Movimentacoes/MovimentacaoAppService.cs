using System.Threading.Tasks;
using Abp.Application.Services;
using ControleDeCustos.Movimentacoes.Dto;
using ControleDeCustos.Models;
using ControleDeCustos.Managers;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ControleDeCustos.Funcionarios.Dto;
using System.Collections.Generic;
using System.Linq;

namespace ControleDeCustos.Movimentacoes
{
    public class MovimentacaoAppService : AsyncCrudAppService<Movimentacao, MovimentacaoDto, int, PagedResultRequestDto, CreateMovimentacaoDto, MovimentacaoDto>, IMovimentacaoAppService
    {
        private readonly IMovimentacaoManager _movimentacaoManager;
        private readonly IFuncionarioManager _funcionarioManager;

        public MovimentacaoAppService(IRepository<Movimentacao> repository,
            IMovimentacaoManager movimentacaoManager,
            IFuncionarioManager funcionarioManager
            ): base(repository)
        {
            _movimentacaoManager = movimentacaoManager;
            _funcionarioManager = funcionarioManager;
        }

        public async Task<ListResultDto<FuncionarioDto>> GetAllFuncionarios()
        {
            var entity = await _funcionarioManager.GetAllList();
            return new ListResultDto<FuncionarioDto>(ObjectMapper.Map<List<FuncionarioDto>>(entity));
        }

        public override async Task<MovimentacaoDto> Create(CreateMovimentacaoDto input)
        {
            var entity = MapToEntity(input);
            var funcionario = await _funcionarioManager.GetById(input.FuncionarioId);
            entity.Funcionario = funcionario;
            var output = await _movimentacaoManager.Create(entity);
            return MapToEntityDto(output);
        }

        public override async Task Delete(EntityDto<int> input)
        {
            await _movimentacaoManager.Delete(input.Id);
        }

        public override async Task<MovimentacaoDto> Update(MovimentacaoDto input)
        {
            var entity = ObjectMapper.Map<Movimentacao>(input);
            var funcionario = await _funcionarioManager.GetById(input.FuncionarioId);
            entity.Funcionario = funcionario;
            var output = await _movimentacaoManager.Update(entity);
            return MapToEntityDto(output);
        }

        protected override Movimentacao MapToEntity(CreateMovimentacaoDto createInput)
        {
            var entity = base.MapToEntity(createInput);
            entity.Funcionario = new Funcionario { Id = createInput.FuncionarioId };
            return entity;
        }

        protected override MovimentacaoDto MapToEntityDto(Movimentacao entity)
        {
            var output = base.MapToEntityDto(entity);
            var funcionario = _funcionarioManager.GetById(entity.Id).Result;
            output.FuncionarioId = funcionario.Id;
            output.FuncionarioNome = funcionario.Nome;
            return output;
        }

        protected override void MapToEntity(MovimentacaoDto updateInput, Movimentacao entity)
        {
            base.MapToEntity(updateInput, entity);
            updateInput.FuncionarioNome = entity.Funcionario.Nome;
        }

        protected override IQueryable<Movimentacao> CreateFilteredQuery(PagedResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Funcionario).Where(d => !d.IsDeleted);
        }
    }
}
