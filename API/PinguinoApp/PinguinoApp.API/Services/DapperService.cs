using Dapper;
using Npgsql;
using PinguinoApp.API.Interface;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace PinguinoApp.API.Services
{
    public class DapperService : IDapperService
    {
        protected readonly NpgsqlConnection _db;

        public DapperService(IDatabaseSettings databaseSettings)
        {
            _db = new NpgsqlConnection(databaseSettings.ConnectionString);
            _db.Open();
        }

        public virtual async Task<SqlMapper.GridReader> MultiAsync(string procedure, object args = null)
        {
            return await _db.QueryMultipleAsync(procedure, param: args, commandType: CommandType.StoredProcedure);
        }

        public virtual async Task<T> SingleAsync<T>(string procedure, object parameters = null)
        {
            return await _db.QuerySingleOrDefaultAsync<T>(procedure, param: parameters, commandType: CommandType.StoredProcedure);
        }

        public virtual async Task<T> ScalarAsync<T>(string procedure, object parameters = null)
        {
            return await _db.ExecuteScalarAsync<T>(procedure, param: parameters, commandType: CommandType.StoredProcedure);
        }

        public virtual async Task RunAsync(string procedure, object parameters = null)
        {
            await _db.ExecuteAsync(procedure, param: parameters, commandType: CommandType.StoredProcedure);
        }

        public virtual async Task<IEnumerable<T>> ListAsync<T>(string procedure, object parameters = null)
        {
            return await _db.QueryAsync<T>(procedure, param: parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
