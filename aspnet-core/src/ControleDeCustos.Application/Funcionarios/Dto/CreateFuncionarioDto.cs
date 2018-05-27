using Abp.AutoMapper;
using ControleDeCustos.Models;
using System.Collections.Generic;

namespace ControleDeCustos.Funcionarios.Dto
{
    [AutoMapTo(typeof(Funcionario))]
    public class CreateFuncionarioDto
    {
        public string Nome { get; set; }
        public ICollection<int> Departamentos { get; set; }
    }
}
