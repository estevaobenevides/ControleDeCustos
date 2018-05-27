using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ControleDeCustos.Models
{
    public class Funcionario : FullAuditedEntity
    {
        [Required]
        [Display(Name = "Funcionário")]
        [StringLength(200, ErrorMessage = "Nome do funcionário não pode exceder 200 caracteres")]
        public string Nome { get; set; }

        [Required]
        public ICollection<FuncionarioDepartamento> Departamentos { get; set; }
    }
}
