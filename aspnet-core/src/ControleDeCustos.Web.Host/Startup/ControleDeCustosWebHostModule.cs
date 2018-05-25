using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ControleDeCustos.Configuration;

namespace ControleDeCustos.Web.Host.Startup
{
    [DependsOn(
       typeof(ControleDeCustosWebCoreModule))]
    public class ControleDeCustosWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ControleDeCustosWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ControleDeCustosWebHostModule).GetAssembly());
        }
    }
}
