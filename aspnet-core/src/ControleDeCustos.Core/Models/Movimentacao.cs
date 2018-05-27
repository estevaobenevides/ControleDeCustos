using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;

namespace ControleDeCustos.Models
{
    public class Movimentacao : FullAuditedEntity
    {
        [Required]
        [Display(Name = "Descrição")]
        [StringLength(500, ErrorMessage = "Descrição da movimentação não pode exceder 500 caracteres")]
        public string Descricao { get; set; }

        [Required]
        public Funcionario Funcionario { get; set; }

        public decimal Valor { get; set; }
    }
}
