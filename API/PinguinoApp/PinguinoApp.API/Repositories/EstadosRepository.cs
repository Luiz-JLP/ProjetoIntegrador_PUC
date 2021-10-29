using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class EstadosRepository : IRepository<Estado>
    {
        IDapperService service;

        public EstadosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.estados SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Estado>> Get()
        {
            string command = @"SELECT id, pais, descricao, sigla, ativo FROM public.estados WHERE ativo = true;";
            return await service.ListAsync<Estado>(command);
        }

        public async Task<Estado> Get(int id)
        {
            string command = @"SELECT id, pais, descricao, sigla, ativo FROM public.estados WHERE id = @id;";
            return await service.SingleAsync<Estado>(command, parameters: new { @id = id });
        }

        public async Task<bool> Insert(Estado entity)
        {
            string command = @"INSERT INTO estados ( pais, descricao, sigla ) VALUES ( @pais, @descricao, @sigla );";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @pais = entity.Pais, @sigla = entity.Sigla });
            return true;
        }

        public async Task<bool> Insert(IEnumerable<Estado> entities)
        {
            string command = @"INSERT INTO estados ( pais, descricao, sigla ) VALUES ( @pais, @descricao, @sigla );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @pais = entity.Pais, @sigla = entity.Sigla });
            }

            return true;
        }

        public async Task<bool> Update(Estado entity)
        {
            string command = @"UPDATE public.estados SET pais = @pais, descricao = @descricao, sigla = @sigla WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @pais = entity.Pais, @sigla = entity.Sigla, @id = entity.Id });
            return true;
        }
    }
}
