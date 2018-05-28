using Abp.Domain.Services;
using ControleDeCustos.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Managers
{
    public interface IFuncionarioManager : IDomainService
    {
        Task<Funcionario> GetById(int id);
        Task<IEnumerable<Funcionario>> GetAllList();
        Task<Funcionario> Create(Funcionario entity);
        Task<Funcionario> Update(Funcionario entity);
        Task Delete(int id);
        Task<IEnumerable<Funcionario>> GetAllByDepartamento(int id);
    }
}
