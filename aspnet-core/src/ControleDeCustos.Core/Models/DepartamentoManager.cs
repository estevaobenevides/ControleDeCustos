using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System.Linq;
using System.Threading.Tasks;

namespace ControleDeCustos.Models
{
    public class DepartamentoManager : DomainService, IDepartamentoManager
    {
        private readonly IRepository<Departamento> _repositoryDepartamento;
        public DepartamentoManager(IRepository<Departamento> repositoryDepartamento)
        {
            _repositoryDepartamento = repositoryDepartamento;
        }

        public async Task<Departamento> Create(Departamento entity)
        {
            var departamento = _repositoryDepartamento.FirstOrDefault(f => f.Id == entity.Id);
            if (departamento != null)
            {
                throw new UserFriendlyException("Departamento já cadastrado.");
            }
            return await _repositoryDepartamento.InsertAsync(entity);
        }

        public async Task<Departamento> Update(Departamento entity)
        {
            var departamento = _repositoryDepartamento.FirstOrDefault(f => f.Id == entity.Id);
            if (departamento != null)
            {
                throw new UserFriendlyException("Departamento não localizado.");
            }
            return await _repositoryDepartamento.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            var departamento = _repositoryDepartamento.FirstOrDefault(f => f.Id == id);
            if (departamento == null)
            {
                throw new UserFriendlyException("Registro não encontrado.");
            }
            if (departamento.Funcionarios.Any())
            {
                throw new UserFriendlyException("Departamento possui funcionários alocados.");
            }
            await _repositoryDepartamento.DeleteAsync(departamento);
        }
    }
}
