const NaoEhPermitidoCriarTransacaoSemConta = require('./NaoPermitidoCriarTransacaoSemConta')
const NaoEhPermitidoCriarTransacaoSeCartaoEstaInativo = require('./NaoPermitidoCriarTransacaoSeCartaoInativo')
const VerificarSeTemLimiteNoCartao = require('./VerificarSeTemLimiteNoCartao')
const NaoDeveTerMaisQue3TransacoesEmMenosDe2min = require('./NaoDeveTerMaisQue3TransacoesEmMenosDe2min')
const NaoDeveHaverTransacaoSimilarEmMenosDe2min = require('./NaoDeveHaverTransacaoSimilarEmMenosDe2min')
const NaoDevePermitirTransacaoDeUmEstabelecimentoProibido = require('./NaoDevePermitirTransacaoDeUmEstabelecimentoProibido')

module.exports = (transacao) => {
  const exceptions = []
  exceptions.push(NaoEhPermitidoCriarTransacaoSemConta())
  exceptions.push(NaoEhPermitidoCriarTransacaoSeCartaoEstaInativo())
  exceptions.push(VerificarSeTemLimiteNoCartao(transacao))
  exceptions.push(NaoDeveTerMaisQue3TransacoesEmMenosDe2min(transacao.time))
  exceptions.push(NaoDeveHaverTransacaoSimilarEmMenosDe2min(transacao))
  exceptions.push(NaoDevePermitirTransacaoDeUmEstabelecimentoProibido(transacao))

  const violations = exceptions.filter(ex => ex)
  return {
    existsViolations: violations.length > 0,
    violations
  }
}
