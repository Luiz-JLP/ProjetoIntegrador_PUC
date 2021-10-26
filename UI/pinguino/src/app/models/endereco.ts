export class Endereco {

    constructor() { 
        this.id = 0;
        this.logradouro = '';
        this.ativo = true;
        this.municipio = 0;
        this.municipioDescricao = ''
        this.complemento = '';
        this.cep = '';
        this.numero = '';
    }

    id: number;
    logradouro: string;
    ativo: boolean;
    municipio: number;
    municipioDescricao: string;
    complemento: string;
    cep: string;
    numero: string;
}