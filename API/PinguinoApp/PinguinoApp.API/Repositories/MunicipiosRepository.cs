using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class MunicipiosRepository : IRepository<Municipio>
    {
        IDapperService service;

        public MunicipiosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.municipios SET ativo = '0' WHERE id = @id;";
            return await service.ScalarAsync<bool>(command, parameters: new { @id = id });
        }

        public async Task<IEnumerable<Municipio>> Get()
        {
            string command = @"SELECT id, estado, descricao, ativo FROM public.municipios;";
            return await service.ListAsync<Municipio>(command);
        }

        public async Task<Municipio> Get(int id)
        {
            string command = @"SELECT id, estado, descricao, ativo FROM public.municipios WHERE id = @id;";
            return await service.SingleAsync<Municipio>(command, parameters: new { @id = id });
        }

        public async Task<bool> Insert(Municipio entity)
        {
            string command = @"INSERT INTO municipios ( estado, descricao, ativo ) VALUES ( @estado, @descricao, @ativo );";
            return await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @estado = entity.Estado, @ativo = entity.Ativo });
        }

        public async Task<bool> Insert(IEnumerable<Municipio> entities)
        {
            string command = @"INSERT INTO municipios ( estado, descricao, ativo ) VALUES ( @estado, @descricao, @ativo );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @estado = entity.Estado, @ativo = entity.Ativo });
            }

            return true;
        }

        public async Task<bool> Update(Municipio entity)
        {
            string command = @"UPDATE public.municipios SET descricao = @descricao, estado = @estado WHERE id = @id;";
            return await service.ScalarAsync<bool>(command, parameters: new { @descricao = entity.Descricao, @estado = entity.Estado, @id = entity.Id });
        }
    }
}
