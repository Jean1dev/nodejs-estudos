const Conta = require('../Conta')
const RegistroContas = require('../ContasRegistradas')
const checkViolations = require('../violations')

module.exports = (dados) => {
  const violationsCheck = checkViolations(dados)
  const conta = RegistroContas.getConta()
  if (violationsCheck.existsViolations) {
    return {
      account: conta.limiteDisponivel ? { 'active-card': conta?.cartaoAtivo, 'available-limit': conta?.limiteDisponivel } : {},
      violations: violationsCheck.violations
    }
  }

  contaCriada = new Conta(dados['active-card'], dados['available-limit'])
  RegistroContas.registarConta(contaCriada)
  return {
    account: { 'active-card': contaCriada.cartaoAtivo, 'available-limit': contaCriada.limiteDisponivel },
    violations: []
  }
}
