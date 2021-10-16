export class Estado {

    constructor() { 
        this.id = 0;
        this.pais = 0;
        this.paisNome = '';
        this.descricao = '';
        this.sigla = '';
        this.ativo = true;
    }

    id: number;
    pais: number;
    paisNome: string;
    descricao: string;
    sigla: string;
    ativo: boolean;
}