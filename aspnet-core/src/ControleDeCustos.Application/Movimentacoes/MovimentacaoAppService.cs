using System.Threading.Tasks;
using Abp.Application.Services;
using ControleDeCustos.Movimentacoes.Dto;
using ControleDeCustos.Models;
using ControleDeCustos.Managers;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;

namespace ControleDeCustos.Movimentacoes
{
    public class MovimentacaoAppService : AsyncCrudAppService<Movimentacao, MovimentacaoDto, int, PagedResultRequestDto, CreateMovimentacaoDto, MovimentacaoDto>, IMovimentacaoAppService
    {
        private readonly IMovimentacaoManager _movimentacaoManager;

        public MovimentacaoAppService(IRepository<Movimentacao> repository, IMovimentacaoManager movimentacaoManager)
            : base(repository)
        {
            _movimentacaoManager = movimentacaoManager;
        }

        public override async Task<MovimentacaoDto> Create(CreateMovimentacaoDto input)
        {
            var entity = ObjectMapper.Map<Movimentacao>(input);
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
            var output = await _movimentacaoManager.Update(entity);
            return MapToEntityDto(output);
        }
    }
}
