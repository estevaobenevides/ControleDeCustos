using System.ComponentModel.DataAnnotations;

namespace ControleDeCustos.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}