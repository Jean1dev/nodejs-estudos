const gerarOutput = require('./enviarOutput')
const CriarContaService = require('./conta/service/CriarConta')
const RegistrarTransacaoService = require('./autorizador/service/RegistrarTransacao')
const RegistrarEstabelcimentoProibido = require('./deny-list/service/AdicionarEstabelecimentoNaListaDeProibidos')
const EVENTO_CRIACAO_CONTA = 'account'
const EVENTO_AUTORIZAR_TRANSACAO = 'transaction'
const EVENTO_MERCHANT_DENIED = 'deny-list'

function processarCriacaoConta(dadosConta) {
  return CriarContaService(dadosConta)
}

function autorizarTransacao(transacao) {
  return RegistrarTransacaoService(transacao)
}

module.exports = (events) => {
  const outputs = []
  events.forEach(event => {

    const keys = Object.keys(event)
    if (keys[0] === EVENTO_CRIACAO_CONTA) {
      outputs.push(processarCriacaoConta(event[keys[0]]))
      return
    }

    if (keys[0] === EVENTO_AUTORIZAR_TRANSACAO) {
      outputs.push(autorizarTransacao(event[keys[0]]))
      return
    }

    if (keys[0] === EVENTO_MERCHANT_DENIED) {
      //TODO: corrigir escrita
      outputs.push(RegistrarEstabelcimentoProibido(event[keys[0]]))
      return
    }

  })

  gerarOutput(outputs)
}
