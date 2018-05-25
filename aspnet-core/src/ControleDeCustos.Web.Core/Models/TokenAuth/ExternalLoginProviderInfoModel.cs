using Abp.AutoMapper;
using ControleDeCustos.Authentication.External;

namespace ControleDeCustos.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
