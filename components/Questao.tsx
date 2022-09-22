import QuestaoModel from "../model/questao";
import Resposta from "./Resposta";
import styles from '../styles/Questao.module.css'
import Enuciado from "./Enuciado";

interface QuestaoProps {
    valor: QuestaoModel
}

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    function renderizarRepostas() {
        return questao.respostas.map((resposta, i) => {
            return (
                <Resposta key={i}
                    valor={resposta}
                    indice={i}
                    letra="A"
                    corFundoLetra="#F2C866"
                />
            )
        })
    }

    return (
        <div className={styles.questao}>
            <Enuciado texto={questao.enuciado} />
            {renderizarRepostas()}
        </div>
    )
}