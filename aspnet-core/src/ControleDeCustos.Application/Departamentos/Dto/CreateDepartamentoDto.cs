using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Departamentos.Dto
{
    [AutoMapTo(typeof(Departamento))]
    public class CreateDepartamentoDto
    {
        public string Nome { get; set; }
    }
}
