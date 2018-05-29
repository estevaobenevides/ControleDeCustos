using Abp.AutoMapper;
using ControleDeCustos.Models;

namespace ControleDeCustos.Movimentacoes.Dto
{
    [AutoMapTo(typeof(Movimentacao))]
    public class CreateMovimentacaoDto
    {
        public string Descricao { get; set; }
        public int Funcionario { get; set; }
        public decimal Valor { get; set; }
    }
}
