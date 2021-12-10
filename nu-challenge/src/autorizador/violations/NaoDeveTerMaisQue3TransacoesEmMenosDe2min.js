const moment = require('moment')
const ContasRegistradas = require('../../conta/ContasRegistradas')
const { HIGH_FREQUENCY_SMALL_INTERVAL } = require('../../violations')
const DOIS_MINUTOS_EM_MILLS = 120000

module.exports = (time) => {
  const transacoes = ContasRegistradas.getTransacoes()

  if (transacoes.length < 3) {
    return ''
  }

  const dataHoraTransacao = moment(time)
  const dataHoraUltimaTransacao = moment(transacoes[transacoes.length - 1].time)

  let diferenca = moment.duration(dataHoraTransacao.diff(dataHoraUltimaTransacao))

  if (diferenca._milliseconds < DOIS_MINUTOS_EM_MILLS) {
    const dataHoraPenultimaTransacao = moment(transacoes[transacoes.length - 2].time)
    diferenca = moment.duration(dataHoraTransacao.diff(dataHoraPenultimaTransacao))

    if (diferenca._milliseconds < DOIS_MINUTOS_EM_MILLS) {
      return HIGH_FREQUENCY_SMALL_INTERVAL
    }
  }
  return ''
}
