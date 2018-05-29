using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Funcionarios.Dto
{
    [AutoMap(typeof(Funcionario))]
    public class FuncionarioDto : EntityDto<int>
    {
        public string Nome { get; set; }
        public int[] DepartamentoIds { get; set; }
    }
}
