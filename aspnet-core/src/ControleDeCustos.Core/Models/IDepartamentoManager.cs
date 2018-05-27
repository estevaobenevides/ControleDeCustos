using Abp.Domain.Services;
using System.Threading.Tasks;

namespace ControleDeCustos.Models
{
    public interface IDepartamentoManager : IDomainService
    {
        Task<Departamento> Create(Departamento entity);
        Task<Departamento> Update(Departamento entity);
        Task Delete(int id);
    }
}
