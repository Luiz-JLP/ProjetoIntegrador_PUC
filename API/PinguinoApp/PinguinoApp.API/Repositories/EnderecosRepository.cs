using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class EnderecosRepository : IRepository<Endereco>
    {
        IDapperService service;

        public EnderecosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = @"UPDATE public.enderecos SET ativo = '0' WHERE id = @id;";
            return await service.ScalarAsync<bool>(command, parameters: new { @id = id });
        }

        public async Task<IEnumerable<Endereco>> Get()
        {
            string command = @"SELECT id, logradouro, numero, complemento, municipio, cep, ativo FROM public.enderecos ";

            var tmp = await service.ListAsync<Endereco>(command);

            return await service.ListAsync<Endereco>(command);
        }

        public async Task<Endereco> Get(int id)
        {
            string command = @"SELECT id, logradouro, numero, complemento, municipio, cep, ativo FROM public.enderecos WHERE id = @id;";
            return await service.SingleAsync<Endereco>(command, parameters: new { @id = id });
        }

        public async Task<bool> Insert(Endereco entity)
        {
            string command = @"INSERT INTO enderecos ( logradouro, numero, complemento, municipio, cep ) VALUES ( @logradouro, @numero, @complemento, @municipio, @cep );";
            return await service.ScalarAsync<bool>(command, parameters: new 
            { 
                @logradouro = entity.Logradouro, 
                @numero = entity.Numero, 
                @complemento = entity.Complemento, 
                @municipio = entity.Municipio, 
                @cep = entity.Cep
            });
        }

        public async Task<bool> Insert(IEnumerable<Endereco> entities)
        {
            string command = @"INSERT INTO enderecos ( logradouro, numero, complemento, municipio, cep ) VALUES ( @logradouro, @numero, @complemento, @municipio, @cep );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters: new
                {
                    @logradouro = entity.Logradouro,
                    @numero = entity.Numero,
                    @complemento = entity.Complemento,
                    @municipio = entity.Municipio,
                    @cep = entity.Cep
                });
            }

            return true;
        }

        public async Task<bool> Update(Endereco entity)
        {
            string command = @"UPDATE public.enderecos SET logradouro = @logradouro, numero = @numero, complemento = @complemento, municipio = @municipio, cep = @cep WHERE id = @id;";
            return await service.ScalarAsync<bool>(command, parameters: new
            {
                @logradouro = entity.Logradouro,
                @numero = entity.Numero,
                @complemento = entity.Complemento,
                @municipio = entity.Municipio,
                @cep = entity.Cep, 
                @id = entity.Id });
        }
    }
}
