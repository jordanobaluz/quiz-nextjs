import styles from '../styles/Questionario.module.css'
import QuestaoModel from "../model/questao"
import Questao from './Questao'
import Botao from './Botao'

interface QuestionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irProximoPasso: () => void
}

//vai lidar com uma questao por vez, quando respondido passa a proxima questao
export default function Questionario(props: QuestionarioProps) {

    function respostaFornecida(indice: number) {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {/* se demorar pra responder faz o tratamento*/}
            {props.questao ?
                <Questao
                    valor={props.questao}
                    tempoParaResposta={6}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={props.irProximoPasso}
                />
                : false
            }

            <Botao onClick={props.irProximoPasso}
                texto={props.ultima ? "Finalizar" : "Proxima"}
            />
        </div>
    )
}