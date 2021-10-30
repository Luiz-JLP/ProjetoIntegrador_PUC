export class Produto {

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sku = '';
        this.codigobarras = '';
        this.fornecedor = 0;
        this.fornecedorNome = '';
        this.descricao = ''
        this.precovenda = 0.0;
        this.ativo = true;
    }

    id: number;
    nome: string;
    sku: string;
    codigobarras: string;
    fornecedor: number;
    fornecedorNome: string;
    descricao: string;
    precovenda : number
    ativo: boolean;
}
