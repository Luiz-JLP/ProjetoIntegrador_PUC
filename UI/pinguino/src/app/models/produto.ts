export class Produto {

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sku = '';
        this.codigobarras = '';
        this.fornecedor_id = 0;
        this.fornecedor_nome = '';
        this.descricao = ''
        this.precovenda = 0.0;
        this.ativo = true;
    }

    id: number;
    nome: string;
    sku: string;
    codigobarras: string;
    fornecedor_id: number;
    fornecedor_nome: string;
    descricao: string;
    precovenda : number
    ativo: boolean;
}
