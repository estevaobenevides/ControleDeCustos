using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ControleDeCustos.Authorization.Roles;
using ControleDeCustos.Authorization.Users;
using ControleDeCustos.MultiTenancy;
using ControleDeCustos.Models;

namespace ControleDeCustos.EntityFrameworkCore
{
    public class ControleDeCustosDbContext : AbpZeroDbContext<Tenant, Role, User, ControleDeCustosDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Movimentacao> Movimentacoes { get; set; }

        public ControleDeCustosDbContext(DbContextOptions<ControleDeCustosDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FuncionarioDepartamento>()
               .HasKey(c => new { c.FuncionarioId, c.DepartamentoId });
        }
    }
}
