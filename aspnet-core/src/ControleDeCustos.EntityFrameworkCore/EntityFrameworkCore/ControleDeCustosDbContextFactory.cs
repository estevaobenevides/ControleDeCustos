using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using ControleDeCustos.Configuration;
using ControleDeCustos.Web;

namespace ControleDeCustos.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class ControleDeCustosDbContextFactory : IDesignTimeDbContextFactory<ControleDeCustosDbContext>
    {
        public ControleDeCustosDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ControleDeCustosDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            ControleDeCustosDbContextConfigurer.Configure(builder, configuration.GetConnectionString(ControleDeCustosConsts.ConnectionStringName));

            return new ControleDeCustosDbContext(builder.Options);
        }
    }
}
