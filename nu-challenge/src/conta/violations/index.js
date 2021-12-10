const VerificarSeContaJaFoiCriada = require('./VerificarSeContaJaFoiCriada')

module.exports = () => {
  const exceptions = []
  exceptions.push(VerificarSeContaJaFoiCriada())

  const violations = exceptions.filter(ex => ex)
  return {
    existsViolations: violations.length > 0,
    violations
  }
}
