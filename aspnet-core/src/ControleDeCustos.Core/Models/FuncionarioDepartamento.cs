namespace ControleDeCustos.Models
{
    public class FuncionarioDepartamento
    {
        public int FuncionarioId { get; set; }
        public Funcionario Funcionario { get; set; }
        
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
    }
}
