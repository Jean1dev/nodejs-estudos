const NaoDevePermitirAdicionarEstabelecimentoSeNaoHouverContaCriada = require('./NaoDevePermitirAdicionarEstabelecimentoSeNaoHouverContaCriada')

module.exports = () => {
  const exceptions = []
  exceptions.push(NaoDevePermitirAdicionarEstabelecimentoSeNaoHouverContaCriada())

  const violations = exceptions.filter(ex => ex)
  return {
    existsViolations: violations.length > 0,
    violations
  }
}
