using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using ControleDeCustos.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Managers
{
    public class DepartamentoManager : DomainService, IDepartamentoManager
    {
        private readonly IRepository<Departamento> _repositoryDepartamento;
        private readonly IRepository<FuncionarioDepartamento> _repositoryFuncionarioDepartamento;
        public DepartamentoManager(IRepository<Departamento> repositoryDepartamento, IRepository<FuncionarioDepartamento> repositoryFuncionarioDepartamento)
        {
            _repositoryDepartamento = repositoryDepartamento;
            _repositoryFuncionarioDepartamento = repositoryFuncionarioDepartamento;
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
            if (departamento == null)
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
            var funcionarios = _repositoryFuncionarioDepartamento.Count(f => f.DepartamentoId == id);
            if (funcionarios > 0)
            {
                throw new UserFriendlyException("Departamento possui funcionários alocados.");
            }
            await _repositoryDepartamento.DeleteAsync(departamento);
        }
    }
}
