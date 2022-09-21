export function embaralhar(elementos: any[]): any[]{
    //recebe o elemento, mapeaia ele acrescentando um valor aletorio, depois faz a ordenação e por ultimo retorna o valor do elemento recebido, esse valor retornado é o ID da questão que foi embaralhado
    return elementos
        .map(valor => ({valor, aleatorio: Math.random()}))
        .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio)
        .map(obj => obj.valor)
}