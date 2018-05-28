using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Departamentos.Dto
{
    [AutoMap(typeof(Departamento))]
    public class DepartamentoDto : EntityDto<int>
    {
        public string Nome { get; set; }
        public int QuantidadeFuncionarios { get; set; }
    }
}
