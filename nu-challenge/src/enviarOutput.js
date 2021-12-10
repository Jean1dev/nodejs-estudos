const fs = require('fs')
const path = require('path')

module.exports = (data) => {
  conteudo = JSON.stringify(data)
  fs.writeFileSync(path.resolve(__dirname, '..', 'operations-output'), conteudo)
  console.log('output gerado:: operations-output')
}
