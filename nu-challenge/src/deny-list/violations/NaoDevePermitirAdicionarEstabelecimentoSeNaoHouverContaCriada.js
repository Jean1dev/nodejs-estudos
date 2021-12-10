const RegistroContas = require('../../conta/ContasRegistradas')
const { ACCOUNT_NOT_INITIALIZED } = require('../../violations')

module.exports = () => {
  const conta = RegistroContas.getConta()
  if (!conta.hasOwnProperty('limiteDisponivel')) {
    return ACCOUNT_NOT_INITIALIZED
  }

  return ''
}
