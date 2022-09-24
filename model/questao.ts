import { embaralhar } from "../functions/arrays"
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

    get naoRespondida(){
        return !this.respondida
    }

    get respondida(){
        //percorre cada resposta para encontrar alguma revelada
        for(let resposta of this.#respostas){
            if(resposta.revelada) return true
        }
        return false
    }

    responderCom(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa
        //revela a reposta certa quando selecionar a resposta errada
        const respostas = this.#respostas.map((resposta, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelarReposta() : resposta //faz a logica de revelar todas as alternativas ou somente a clicada
        })

        //retorna uma nova instancia da questão, aproveitando id e enuciado, porem irá retornar as respostas conforme a checagem se foi correta ou não e a flag se acertou ou não foi calculado e modificado
        return new QuestaoModel(this.id, this.enuciado, respostas, acertou)
    }

    //retornar uma nova instancia de QuestaoModel
    embaralharRespostas(): QuestaoModel{
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id, this.#enuciado, respostasEmbaralhadas, this.#acertou)
    }

    //metodo de instancia, que retorna uma instancia de QuestaoModel
    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel{
        //cria um array com instancias de resposta model
        const respostas = obj.respostas.map(resp => RespostaModel.criarUsandoObjeto(resp))
        return new QuestaoModel(obj.id, obj.enuciado, respostas, obj.acertou)
    }

    ///retorno um objeto com os atributos e valores dos atributos
    converterParaObjeto(){
        return {
            id: this.#id,
            enuciado: this.#enuciado,
            respostas: this.#respostas.map(resp => resp.paraObejeto()),
            respondida: this.respondida,
            acertou: this.#acertou
        }
    }
}