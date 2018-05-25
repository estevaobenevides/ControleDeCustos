using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ControleDeCustos.Authorization.Roles;
using ControleDeCustos.Authorization.Users;
using ControleDeCustos.MultiTenancy;

namespace ControleDeCustos.EntityFrameworkCore
{
    public class ControleDeCustosDbContext : AbpZeroDbContext<Tenant, Role, User, ControleDeCustosDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public ControleDeCustosDbContext(DbContextOptions<ControleDeCustosDbContext> options)
            : base(options)
        {
        }
    }
}
