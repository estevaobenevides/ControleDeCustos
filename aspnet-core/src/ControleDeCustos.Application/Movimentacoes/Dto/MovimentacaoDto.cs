using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Movimentacoes.Dto
{
    [AutoMap(typeof(Movimentacao))]
    public class MovimentacaoDto : EntityDto<int>
    {
        public string Descricao { get; set; }
        public string Funcionario { get; set; }
        public decimal Valor { get; set; }
    }
}
