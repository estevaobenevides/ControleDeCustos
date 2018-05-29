using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Funcionarios.Dto
{
    [AutoMapTo(typeof(Funcionario))]
    public class CreateFuncionarioDto
    {
        public string Nome { get; set; }
        public int[] DepartamentoIds { get; set; }
    }
}
