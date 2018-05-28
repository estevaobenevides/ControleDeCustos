using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using ControleDeCustos.Models;
using System.Threading.Tasks;

namespace ControleDeCustos.Managers
{
    public class MovimentacaoManager : DomainService, IMovimentacaoManager
    {
        private readonly IRepository<Movimentacao> _repositoryMovimentacao;
        public MovimentacaoManager(IRepository<Movimentacao> repositoryMovimentacao)
        {
            _repositoryMovimentacao = repositoryMovimentacao;
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

        public async Task<Movimentacao> Update(Movimentacao entity)
        {
            var movimentacao = _repositoryMovimentacao.FirstOrDefault(f => f.Id == entity.Id);
            if (movimentacao == null)
            {
                throw new UserFriendlyException("Movimentação não localizada.");
            }
            return await _repositoryMovimentacao.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            var movimentacao = _repositoryMovimentacao.FirstOrDefault(f => f.Id == id);
            if (movimentacao == null)
            {
                throw new UserFriendlyException("Registro não encontrado.");
            }
            await _repositoryMovimentacao.DeleteAsync(movimentacao);
        }
    }
}
