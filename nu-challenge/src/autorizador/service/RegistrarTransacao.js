const checkViolations = require('../violations')
const RegistroContas = require('../../conta/ContasRegistradas')

module.exports = dados => {
  const violationsCheck = checkViolations(dados)
  const conta = RegistroContas.getConta()
  if (violationsCheck.existsViolations) {
    return {
      account: conta.limiteDisponivel ? { 'active-card': conta?.cartaoAtivo, 'available-limit': conta?.limiteDisponivel } : {},
      violations: violationsCheck.violations
    }
  }

  const contaUpdated = RegistroContas.addTransacao(dados)
  return {
    account: { 'active-card': contaUpdated?.cartaoAtivo, 'available-limit': contaUpdated?.limiteDisponivel },
    violations: []
  }
}
