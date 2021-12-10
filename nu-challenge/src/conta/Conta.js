class Conta {
  cartaoAtivo
  limiteDisponivel
  transacoes

  constructor(cartaoAtivo, limiteDisponivel) {
    this.cartaoAtivo = cartaoAtivo
    this.limiteDisponivel = limiteDisponivel
    this.transacoes = []
  }
}

module.exports = Conta
