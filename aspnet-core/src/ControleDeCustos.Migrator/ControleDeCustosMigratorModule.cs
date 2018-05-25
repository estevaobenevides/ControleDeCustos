using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ControleDeCustos.Configuration;
using ControleDeCustos.EntityFrameworkCore;
using ControleDeCustos.Migrator.DependencyInjection;

namespace ControleDeCustos.Migrator
{
    [DependsOn(typeof(ControleDeCustosEntityFrameworkModule))]
    public class ControleDeCustosMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public ControleDeCustosMigratorModule(ControleDeCustosEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(ControleDeCustosMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                ControleDeCustosConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ControleDeCustosMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
