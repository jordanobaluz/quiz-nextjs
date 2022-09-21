import styles from '../styles/Enuciado.module.css'

interface EnuciadoProps {
    texto: string
}

export default function Enuciado(props: EnuciadoProps) {
    return (
        <div className={styles.enuciado}>
            <div className={styles.texto}>
                {props.texto}
            </div>
        </div>
    )
}