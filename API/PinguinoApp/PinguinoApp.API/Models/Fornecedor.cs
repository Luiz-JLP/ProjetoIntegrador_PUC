using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PinguinoApp.API.Models
{
    public class Fornecedor
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cnpjcpf { get; set; }

        public string Cidade { get; set; }

        public string Estado { get; set; }
        public string Endereco { get; set; }
        public string Email { get; set; }

        public List<Produto> Produtos { get; set; }
    }
}
