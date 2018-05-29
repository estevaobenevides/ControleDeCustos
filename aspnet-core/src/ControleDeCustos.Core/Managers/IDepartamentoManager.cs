using Abp.Domain.Services;
using ControleDeCustos.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ControleDeCustos.Managers
{
    public interface IDepartamentoManager : IDomainService
    {
        Task<Departamento> Create(Departamento entity);
        Task<Departamento> Update(Departamento entity);
        Task Delete(int id);
        Task<IEnumerable<Departamento>> GetAllList();
        Task<IEnumerable<Departamento>> GetAllByFuncionario(int id);
    }
}
