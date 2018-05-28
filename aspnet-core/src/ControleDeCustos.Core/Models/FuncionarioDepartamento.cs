using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleDeCustos.Models
{
    public class FuncionarioDepartamento : Entity<int>
    {
        [NotMapped]
        public override int Id
        {
            get { return 0; }
            set { /* nothing */ }
        }

        public int FuncionarioId { get; set; }
        public Funcionario Funcionario { get; set; }

        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
    }
}
