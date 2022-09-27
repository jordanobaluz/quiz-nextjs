import { useEffect, useRef, useState } from 'react'
import Botao from '../components/Botao'
import Questao from '../components/Questao'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { useRouter } from 'next/router'

const BASE_URL = 'https://quiz-nextjs-git-main-jordanobaluz.vercel.app/'

export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  //monta as questões trazendo os dados via API do banco de questões 
  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  //se for maior que zero tem questão e então chama o metodo carregar questões passando a primeira questão
  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  // const questaoRef = useRef<QuestaoModel>()

  //ira mudar a referencia da questao, atualizando para a ultima
  // useEffect(() => {
  //   questaoRef.current = questao
  // }, [questao])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta() {
    if (questao) {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      //se for um valor valido retorna proximo indice, se não retorna undefined
      return idsDasQuestoes[proximoIndice]
    }
  }

  function irPraProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuesta(proximoId) : finalizar()
  }

  function irPraProximaQuesta(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irProximoPasso={irPraProximoPasso}
    />
  ) : false
}
