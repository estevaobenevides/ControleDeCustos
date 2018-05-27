using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Models
{
    public class MovimentacaoManager : DomainService, IMovimentacaoManager
    {
        private readonly IRepository<Movimentacao> _repositoryMovimentacao;
        public MovimentacaoManager(IRepository<Movimentacao> repositoryMovimentacao)
        {
            _repositoryMovimentacao = repositoryMovimentacao;
        }

        public Movimentacao GetById(int id)
        {
            return _repositoryMovimentacao.Get(id);
        }

        public IEnumerable<Movimentacao> GetAllList()
        {
            return _repositoryMovimentacao.GetAllList();
        }

        public async Task<Movimentacao> Create(Movimentacao entity)
        {
            var movimentacao = _repositoryMovimentacao.FirstOrDefault(f => f.Id == entity.Id);
            if (movimentacao != null)
            {
                throw new UserFriendlyException("Movimentação já cadastrada.");
            }
            return await _repositoryMovimentacao.InsertAsync(entity);
        }

        public void Update(Movimentacao entity)
        {
            _repositoryMovimentacao.UpdateAsync(entity);
        }

        public void Delete(int id)
        {
            var movimentacao = _repositoryMovimentacao.FirstOrDefault(f => f.Id == id);
            if (movimentacao == null)
            {
                throw new UserFriendlyException("Registro não encontrado.");
            }
            _repositoryMovimentacao.Delete(movimentacao);
        }
    }
}
