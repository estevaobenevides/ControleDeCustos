using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Models
{
    public class FuncionarioManager : DomainService, IFuncionarioManager
    {
        private readonly IRepository<Funcionario> _repositoryFuncionario;
        public FuncionarioManager(IRepository<Funcionario> repositoryFuncionario)
        {
            _repositoryFuncionario = repositoryFuncionario;
        }

        public async Task<Funcionario> GetById(int id)
        {
            return await _repositoryFuncionario.GetAsync(id);
        }

        public async Task<IEnumerable<Funcionario>> GetAllList()
        {
            return await _repositoryFuncionario.GetAllListAsync();
        }

        public async Task<Funcionario> Create(Funcionario entity)
        {
            var funcionario = await _repositoryFuncionario.FirstOrDefaultAsync(f => f.Id == entity.Id);
            if (funcionario != null)
            {
                throw new UserFriendlyException("Funcionário já cadastrado.");
            }
            return await _repositoryFuncionario.InsertAsync(entity);
        }

        public async Task<Funcionario> Update(Funcionario entity)
        {
            return await _repositoryFuncionario.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            var funcionario = await _repositoryFuncionario.FirstOrDefaultAsync(f => f.Id == id);
            if (funcionario == null)
            {
                throw new UserFriendlyException("Registro não encontrado.");
            }
            await _repositoryFuncionario.DeleteAsync(funcionario);
        }
    }
}
