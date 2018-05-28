using Abp.Domain.Services;
using ControleDeCustos.Models;
using System.Threading.Tasks;

namespace ControleDeCustos.Managers
{
    public interface IMovimentacaoManager : IDomainService
    {
        Task<Movimentacao> Create(Movimentacao entity);
        Task<Movimentacao> Update(Movimentacao entity);
        Task Delete(int id);
    }
}
