using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Movimentacoes.Dto
{
    [AutoMapTo(typeof(Movimentacao))]
    public class MovimentacaoDto : EntityDto<int>
    {
        public string Descricao { get; set; }        
        public Funcionario Funcionario { get; set; }
        public decimal Valor { get; set; }
    }
}
