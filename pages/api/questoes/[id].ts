import questoes from "../bancoDeQuestoes"

export default function handler(req, res) {
  //pega o id passado pela url
  const idSelecionado = +req.query.id

  //pega o array para ir a condição se é igual ao passado pelo id
  const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)

  //se tiver 1 tem questão, sem tamanho então sem questão
  if(unicaQuestaoOuNada.length === 1){
    const questaoSelecionada = unicaQuestaoOuNada[0]
    res.status(200).json(questaoSelecionada.converterParaObjeto())
  } else {
    //não existe o ID, por isso um 204 de sem conteudo
    res.status(204).send()
  }
    
}