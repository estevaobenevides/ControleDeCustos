namespace ControleDeCustos.Movimentacoes.DTO
{
    public class CreateMovimentacaoInput
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
    }
}
