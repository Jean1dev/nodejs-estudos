const { ACCOUNT_ALREADY_CREATED } = require('../../violations')
const ContasRegistradas = require('../ContasRegistradas')

module.exports = () => {
  if (ContasRegistradas.getContas().length > 0) {
    return ACCOUNT_ALREADY_CREATED
  }


  return ''
}
