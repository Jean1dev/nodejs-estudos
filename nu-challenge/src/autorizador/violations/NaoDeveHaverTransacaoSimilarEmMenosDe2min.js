const moment = require('moment')
const ContasRegistradas = require('../../conta/ContasRegistradas')
const { DOUBLE_TRANSACTION } = require('../../violations')

module.exports = (transacao) => {
  const transacoes = ContasRegistradas.getTransacoes()

  if (!transacoes.length) {
    return ''
  }

  let encontroadoTransacaoDuplicada = false
  const dataHoraTransacao = moment(transacao.time)
  transacoes
    .filter(item => item.merchant === transacao.merchant)
    .filter(item => item.amount === transacao.amount)
    .forEach(item => {
      const dataHoraDestaTransacao = moment(item.time)
      const diferenca = moment.duration(dataHoraTransacao.diff(dataHoraDestaTransacao))
      if (diferenca._data.minutes < 2) {
        encontroadoTransacaoDuplicada = true
      }
    })


  return encontroadoTransacaoDuplicada ? DOUBLE_TRANSACTION : ''
}
