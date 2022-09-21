import QuestaoModel from "../model/questao";
import styles from '../styles/Questao.module.css'
import Enuciado from "./Enuciado";

interface QuestaoProps {
    valor: QuestaoModel
}

export default function Questao(props: QuestaoProps) {
    const questao = props.valor

    return (
        <div className={styles.questao}>
            <Enuciado texto={questao.enuciado} />
        </div>
    )
}