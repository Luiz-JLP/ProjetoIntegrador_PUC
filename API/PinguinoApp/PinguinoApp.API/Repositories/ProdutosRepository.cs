using PinguinoApp.API.Interfaces;
using PinguinoApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PinguinoApp.API.Repositories
{
    public class ProdutosRepository : IRepository<Produto>
    {
        IDapperService service;
        string tabela = "public.produtos";

        public ProdutosRepository(IDapperService service)
        {
            this.service = service;
        }

        public async Task<bool> Delete(int id)
        {
            string command = $"UPDATE {tabela} SET ativo = '0' WHERE id = @id;";
            await service.ScalarAsync<bool>(command, parameters: new { @id = id });
            return true;
        }

        public async Task<IEnumerable<Produto>> Get()
        {
            string command = $"SELECT id, nome, sku, codigobarras, fornecedor, descricao, precovenda, ativo FROM {tabela} WHERE ativo = true;";
            return await service.ListAsync<Produto>(command);
        }

        public async Task<Produto> Get(int id)
        {
            string command = $"SELECT id, nome, sku, codigobarras, fornecedor, descricao, precovenda, ativo FROM {tabela} WHERE id = @id;";
            return await service.SingleAsync<Produto>(command, parameters: new { @id = id });
        }

        public async Task<bool> Insert(Produto entity)
        {
            string command = $"INSERT INTO {tabela} ( nome, sku, codigobarras, fornecedor, descricao, precovenda, ativo ) VALUES ( @nome, @sku, @codigobarras, @fornecedor, @descricao, @precovenda, @ativo );";
            await service.ScalarAsync<bool>(
                command,
                parameters: new
                {
                    @nome = entity.Nome,
                    @sku = entity.Sku,
                    @codigobarras = entity.Codigobarras,
                    @fornecedor = entity.Fornecedor,
                    @descricao = entity.Descricao,
                    @precovenda = entity.Precovenda,
                    @ativo = entity.Ativo
                }
            );

            return true;
        }

        public async Task<bool> Insert(IEnumerable<Produto> entities)
        {
            string command = $"INSERT INTO {tabela} ( nome, sku, codigobarras, fornecedor, descricao, precovenda, ativo ) VALUES ( @nome, @sku, @codigobarras, @fornecedor, @descricao, @precovenda, @ativo );";

            foreach (var entity in entities)
            {
                await service.ScalarAsync<bool>(command, parameters:
                                                new
                                                {
                                                    @nome = entity.Nome,
                                                    @sku = entity.Sku,
                                                    @codigobarras = entity.Codigobarras,
                                                    @fornecedor = entity.Fornecedor,
                                                    @descricao = entity.Descricao,
                                                    @precovenda = entity.Precovenda,
                                                    @ativo = entity.Ativo
                                                });
            }
            return true;
        }

        public async Task<bool> Update(Produto entity)
        {
            string command = $"UPDATE {tabela} SET nome=@nome, sku=@sku, codigobarras=@codigobarras, fornecedor=@fornecedor, descricao=@descricao, precovenda=@precovenda WHERE id = @id;";
            await service.ScalarAsync<bool>(
                command,
                parameters: new
                {
                    @nome = entity.Nome,
                    @sku = entity.Sku,
                    @codigobarras = entity.Codigobarras,
                    @fornecedor = entity.Fornecedor,
                    @descricao = entity.Descricao,
                    @precovenda = entity.Precovenda,
                }
            );

            return true;
        }
    }
}
