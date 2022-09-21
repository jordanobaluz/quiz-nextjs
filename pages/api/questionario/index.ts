import questoes from "../bancoDeQuestoes"

const foo = (req, res) => {
    
    res.status(200).json(
        questoes.map(questao => questao.id)
    )
}

export default foo