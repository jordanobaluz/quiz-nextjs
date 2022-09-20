import RespostaModel from "./resposta"

export default class QuestaoModel {
    #id: number
    #enuciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    // #respondida: boolean

    constructor( id: number, enuciado: string, respostas: any[], acertou = false){
        this.#id = id
        this.#enuciado = enuciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id(){
        return this.#id
    }

    get enuciado(){
        return this.#enuciado
    }

    get respostas(){
        return this.#respostas
    }

    get acertou(){
        return this.#acertou
    }

    get respondida(){
        //percorre cada resposta para encontrar alguma revelada
        for(let resposta of this.#respostas){
            if(resposta.revelada) return true
        }
        return false
    }

    ///retorno um objeto com os atributos e valores dos atributos
    converterParaObjeto(){
        return {
            id: this.#id,
            enuciado: this.#enuciado,
            respostas: this.#respostas.map(resp => resp.paraObejeto()),
            acertou: this.#acertou
        }
    }
}