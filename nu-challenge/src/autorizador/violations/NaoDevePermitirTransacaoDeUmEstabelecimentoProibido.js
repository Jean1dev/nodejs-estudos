const { MERCHANT_DENIED } = require('../../violations')
const { getDenyList } = require('../../deny-list/Denylist')

module.exports = transacao => {
  const estabelecimentoEncontrado = getDenyList().find(merchant => merchant === transacao.merchant)
  if (estabelecimentoEncontrado) {
    return MERCHANT_DENIED
  }

  return ''
}
