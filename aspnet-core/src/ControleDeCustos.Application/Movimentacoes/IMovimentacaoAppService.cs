using Abp.Application.Services;
using ControleDeCustos.Movimentacoes.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Movimentacoes
{
    public interface IMovimentacaoAppService : IApplicationService
    {
        IEnumerable<GetMovimentacaoOutput> ListAll();
        Task Create(CreateMovimentacaoInput input);
        void Update(UpdateMovimentacaoInput input);
        void Delete(DeleteMovimentacaoInput input);
        GetMovimentacaoOutput GetById(GetMovimentacaoInput input);
    }
}
