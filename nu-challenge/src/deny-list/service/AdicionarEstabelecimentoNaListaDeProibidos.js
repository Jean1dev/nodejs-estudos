const { replaceDenyList } = require('../Denylist')
const RegistroContas = require('../../conta/ContasRegistradas')
const checkViolations = require('../violations')

module.exports = dados => {
  const violationsCheck = checkViolations(dados)
  const conta = RegistroContas.getConta()
  if (violationsCheck.existsViolations) {
    return {
      account: {},
      violations: violationsCheck.violations
    }
  }

  replaceDenyList(dados['deny-list'])

  return {
    account: { 'deny-list': dados['deny-list'], 'active-card': conta.cartaoAtivo, 'available-limit': conta.limiteDisponivel },
    violations: []
  }
}
