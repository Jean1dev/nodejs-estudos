const ContasRegistradas = require('../../conta/ContasRegistradas')
const { ACCOUNT_NOT_INITIALIZED } = require('../../violations')

module.exports = () => {
  if (!ContasRegistradas.getContas().length) {
    return ACCOUNT_NOT_INITIALIZED
  }

  return ''
}
