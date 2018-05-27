using Abp.Domain.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Models
{
    public interface IMovimentacaoManager : IDomainService
    {
        Movimentacao GetById(int id);
        IEnumerable<Movimentacao> GetAllList();
        Task<Movimentacao> Create(Movimentacao entity);
        void Update(Movimentacao entity);
        void Delete(int id);
    }
}
