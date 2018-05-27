using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using AutoMapper;
using ControleDeCustos.Movimentacoes.DTO;
using ControleDeCustos.Models;

namespace ControleDeCustos.Movimentacoes
{
    public class MovimentacaoAppService : ApplicationService, IMovimentacaoAppService
    {
        private readonly IMovimentacaoManager _movimentacaoManager;
        public MovimentacaoAppService(IMovimentacaoManager movimentacaoManager)
        {
            _movimentacaoManager = movimentacaoManager;
        }

        public async Task Create(CreateMovimentacaoInput input)
        {
            Movimentacao output = Mapper.Map<CreateMovimentacaoInput, Movimentacao>(input);
            await _movimentacaoManager.Create(output);
        }

        public void Delete(DeleteMovimentacaoInput input)
        {
            _movimentacaoManager.Delete(input.Id);
        }

        public GetMovimentacaoOutput GetById(GetMovimentacaoInput input)
        {
            var movimentacao = _movimentacaoManager.GetById(input.Id);
            GetMovimentacaoOutput output = Mapper.Map<Movimentacao, GetMovimentacaoOutput>(movimentacao);
            return output;
        }

        public IEnumerable<GetMovimentacaoOutput> ListAll()
        {
            var list = _movimentacaoManager.GetAllList().ToList();
            List<GetMovimentacaoOutput> output = Mapper.Map<List<Movimentacao>, List<GetMovimentacaoOutput>>(list);
            return output;
        }

        public void Update(UpdateMovimentacaoInput input)
        {
            Movimentacao output = Mapper.Map<UpdateMovimentacaoInput, Movimentacao>(input);
            _movimentacaoManager.Update(output);
        }
    }
}
