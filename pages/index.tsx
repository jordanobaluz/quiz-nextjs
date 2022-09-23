import { useEffect, useRef, useState } from 'react'
import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Violeta'),
  RespostaModel.certa('Azul'),
])
export default function Home() {
  const [questao, setQuestao] = useState(questaoMock)
  // const questaoRef = useRef<QuestaoModel>()

  //ira mudar a referencia da questao, atualizando para a ultima
  // useEffect(() => {
  //   questaoRef.current = questao
  // }, [questao])

  function respostaFornecida(indice: number) {
    console.log(indice)
    setQuestao(questao.responderCom(indice))
  }

  function tempoEsgotado() {
    if (questao.naoRespondida) {
      setQuestao(questao.responderCom(-1))
    }
  }

  return (
    <div style={
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }
    }>
      <Questao valor={questao}
        tempoParaResposta={5}
        respostaFornecida={respostaFornecida}
        tempoEsgotado={tempoEsgotado}
      />
    </div>
  )
}
