using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ControleDeCustos.EntityFrameworkCore
{
    public static class ControleDeCustosDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ControleDeCustosDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ControleDeCustosDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
