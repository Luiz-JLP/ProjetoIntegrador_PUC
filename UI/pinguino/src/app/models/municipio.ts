export class Municipio {

    constructor() { 
        this.id = 0;
        this.descricao = '';
        this.estado = 0;
        this.estadoSigla = '';
        this.ativo = true;
    }
    
    id: number;
    descricao: string;
    estado : number
    estadoSigla : string
    ativo: boolean;
}