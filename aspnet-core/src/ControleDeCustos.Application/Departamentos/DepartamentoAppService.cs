using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ControleDeCustos.Departamentos.Dto;
using ControleDeCustos.Models;

namespace ControleDeCustos.Departamentos
{
    public class DepartamentoAppService : AsyncCrudAppService<Departamento, DepartamentoDto, int, PagedResultRequestDto, CreateDepartamentoDto, DepartamentoDto>, IDepartamentoAppService
    {
        private readonly IDepartamentoManager _departamentoManager;

        public DepartamentoAppService(IRepository<Departamento> repository, IDepartamentoManager departamentoManager)
            : base(repository)
        {
            _departamentoManager = departamentoManager;
        }
        
        public override async Task<DepartamentoDto> Create(CreateDepartamentoDto input)
        {
            var entity = ObjectMapper.Map<Departamento>(input);
            var output = await _departamentoManager.Create(entity);
            return MapToEntityDto(output);
        }

        public override async Task Delete(EntityDto<int> input)
        {
            await _departamentoManager.Delete(input.Id);
        }

        public override async Task<DepartamentoDto> Update(DepartamentoDto input)
        {
            var entity = ObjectMapper.Map<Departamento>(input);
            var output = await _departamentoManager.Update(entity);
            return MapToEntityDto(output);
        }
    }
}
