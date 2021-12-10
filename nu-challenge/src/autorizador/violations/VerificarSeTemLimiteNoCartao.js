const ContasRegistradas = require('../../conta/ContasRegistradas')
const { INSSUFICIENT_LIMIT } = require('../../violations')

module.exports = (transacao) => {
  if (ContasRegistradas.verificarSeTemLimiteDisponivel(transacao['amount'])) {
    return ''
  }

  return INSSUFICIENT_LIMIT
}
