using Abp.AutoMapper;
using ControleDeCustos.Models;
namespace ControleDeCustos.Funcionarios.Dto
{
    [AutoMapTo(typeof(FuncionarioDepartamento))]
    public class DepartamentoFuncionarioDto
    {
    }
}
