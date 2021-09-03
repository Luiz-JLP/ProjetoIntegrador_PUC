using PinguinoApp.API.Interface;

namespace PinguinoApp.API.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
    }
}
