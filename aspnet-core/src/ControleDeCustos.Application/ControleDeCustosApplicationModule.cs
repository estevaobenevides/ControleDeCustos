using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ControleDeCustos.Authorization;

namespace ControleDeCustos
{
    [DependsOn(
        typeof(ControleDeCustosCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ControleDeCustosApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ControleDeCustosAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ControleDeCustosApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
