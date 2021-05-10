export class ResultadoDto {
    constructor(
        public mensagem: string,
        public sucesso: boolean,
        public dados: any,
        public erros: any,
    ) {

    }
}
