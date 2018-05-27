using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ControleDeCustos.Models
{
    public class Departamento : FullAuditedEntity
    {
        [Required]
        [Display(Name = "Departamento")]
        [StringLength(100, ErrorMessage = "Nome do departamento não pode exceder 100 caracteres")]
        public string Nome { get; set; }
        
        public ICollection<FuncionarioDepartamento> Funcionarios { get; set; }

        public ICollection<Movimentacao> Movimentacoes { get; set; }
    }
}
