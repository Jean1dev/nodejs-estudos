const fs = require(`fs`)

const func = arquivo => {
    console.log("Fazendo leitura assíncrona");
    let inicio = new Date().getTime()
    fs.readFile(arquivo)
    let fim = new Date().getTime()
    console.log("Bloqueio assíncrono: " + (fim - inicio) + "ms");
}

module.exports = func
