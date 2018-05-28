using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ControleDeCustos.Movimentacoes.Dto;
namespace ControleDeCustos.Movimentacoes
{
    public interface IMovimentacaoAppService : IAsyncCrudAppService<MovimentacaoDto, int, PagedResultRequestDto, CreateMovimentacaoDto, MovimentacaoDto>
    {
    }
}
