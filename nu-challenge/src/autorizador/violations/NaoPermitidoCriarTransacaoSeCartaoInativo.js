const ContasRegistradas = require('../../conta/ContasRegistradas')
const { CARD_NOT_ACTIVE } = require('../../violations')

module.exports = () => {
  if (ContasRegistradas.cartaoEstaAtivo()) {
    return ''
  }

  return CARD_NOT_ACTIVE
}
