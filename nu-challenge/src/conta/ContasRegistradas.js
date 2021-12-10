const accounts = []

exports.clear = () => accounts.splice(0, accounts.length)

exports.registarConta = (conta) => accounts.push(conta)

exports.getContas = () => accounts

exports.getConta = () => {
  return accounts[0] || {}
}

exports.addTransacao = (transacao) => {
  const conta = accounts[0]
  conta.transacoes.push(transacao)
  conta.limiteDisponivel = conta.limiteDisponivel - transacao.amount
  return conta
}

exports.getTransacoes = () => {
  return accounts[0]?.transacoes || []
}

exports.cartaoEstaAtivo = () => {
  if (!accounts.length) {
    return true
  }

  return accounts[0].cartaoAtivo
}

exports.verificarSeTemLimiteDisponivel = (valorCompra) => {
  if (!accounts.length) {
    return true
  }

  return accounts[0].limiteDisponivel >= valorCompra
}

