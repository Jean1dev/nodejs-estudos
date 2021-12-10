const fs = require('fs')
const path = require('path')
const processarEventos = require('./processarEventos')
const sdtinFileName = path.resolve(__dirname, '..', 'operations')

while (true) {
  if (fs.existsSync(sdtinFileName)) {
    console.info('arquivo capturado, iniciando processamento')

    const fileContent = fs.readFileSync(sdtinFileName)
    const fileParsed = JSON.parse(fileContent)
    fs.rmSync(sdtinFileName)
    console.log(fileParsed)
    processarEventos(fileParsed)
  }
}
