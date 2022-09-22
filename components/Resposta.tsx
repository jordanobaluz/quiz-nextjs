import styles from '../styles/Reposta.module.css'
import RespostaModel from "../model/resposta"

interface RespostaProps {
    valor: RespostaModel
    indice: number
    letra: string //corresponde a letra da resposta
    corFundoLetra: string
    respostaFornecida: (indice: number) => void
}

export default function Resposta(props: RespostaProps) {
    const resposta = props.valor
    return (
        <div className={styles.resposta}
            onClick={() => props.respostaFornecida(props.indice)}
        >
            <div className={styles.conteudoResposta}>
                <div className={styles.frente}>
                    <div className={styles.letra}
                        style={{ backgroundColor: props.corFundoLetra }}
                    >
                        {props.letra}
                    </div>
                    <div className={styles.valor}>
                        {resposta.valor}
                    </div>
                </div>
                <div className={styles.verso}>

                </div>
            </div>
        </div>
    )
}