const RegistrarTransacao = require('../../../src/autorizador/service/RegistrarTransacao')
const ContasRegistradas = require('../../../src/conta/ContasRegistradas')
const { replaceDenyList, clear: clearDenyList } = require('../../../src/deny-list/Denylist')
const Conta = require('../../../src/conta/Conta')
const {
  ACCOUNT_NOT_INITIALIZED,
  CARD_NOT_ACTIVE,
  INSSUFICIENT_LIMIT,
  HIGH_FREQUENCY_SMALL_INTERVAL,
  DOUBLE_TRANSACTION,
  MERCHANT_DENIED
} = require('../../../src/violations')

function umaConta() {
  return new Conta(true, 100)
}

describe('RegistrarTransacao Service testes', () => {

  beforeEach(() => {
    ContasRegistradas.clear()
    clearDenyList()
  })

  test('nao deve registrar uma transacao porque o estabelecimento esta probido', () => {
    const conta = umaConta()
    ContasRegistradas.registarConta(conta)
    const merchant = 'Burger King'
    replaceDenyList([merchant])

    const transacao = { "merchant": merchant, "amount": 20, "time": "2019-02-13T11:00:00.000Z" }
    const registro = RegistrarTransacao(transacao)
    expect(registro.account['available-limit']).toBe(100)
    expect(registro.violations).toHaveLength(1)
    expect(registro.violations[0]).toBe(MERCHANT_DENIED)
  })

  test('deve registrar uma transacao corretamente', () => {
    const conta = umaConta()
    ContasRegistradas.registarConta(conta)

    const transacao = { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z" }
    const registro = RegistrarTransacao(transacao)
    expect(registro.account['available-limit']).toBe(80)
    expect(registro.violations).toHaveLength(0)
  })

  test('Nao deve registrar transacao pois a conta nao foi iniciada', () => {
    const transacao = { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z" }
    const registro = RegistrarTransacao(transacao)
    expect(registro.account).toStrictEqual({})
    expect(registro.violations).toHaveLength(1)
    expect(registro.violations[0]).toBe(ACCOUNT_NOT_INITIALIZED)
  })


  test('Não deve criar transação porque o cartão esta inativo', () => {
    const conta = umaConta()
    conta.cartaoAtivo = false
    ContasRegistradas.registarConta(conta)

    const transacao = { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z" }
    const registro = RegistrarTransacao(transacao)
    expect(registro.account['available-limit']).toBe(100)
    expect(registro.violations).toHaveLength(1)
    expect(registro.violations[0]).toBe(CARD_NOT_ACTIVE)
  })

  test('Não deve criar transação porque o cartão tem limite insuficiente', () => {
    const conta = umaConta()
    ContasRegistradas.registarConta(conta)

    const transacao = { "merchant": "Burger King", "amount": 120, "time": "2019-02-13T11:00:00.000Z" }
    const registro = RegistrarTransacao(transacao)
    expect(registro.account['available-limit']).toBe(100)
    expect(registro.violations).toHaveLength(1)
    expect(registro.violations[0]).toBe(INSSUFICIENT_LIMIT)
  })

  test('Não deve criar transação porque ocorram 3 transações de sucesso nos ultimos 2minutos', () => {
    const conta = umaConta()
    ContasRegistradas.registarConta(conta)

    const transacao = { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:00.000Z" }
    const transacao1 = { "merchant": "Habbib's", "amount": 20, "time": "2019-02-13T11:00:01.000Z" }
    const transacao2 = { "merchant": "McDonald's", "amount": 20, "time": "2019-02-13T11:01:01.000Z" }
    const transacao3 = { "merchant": "Subway", "amount": 20, "time": "2019-02-13T11:01:31.000Z" }

    const registro = RegistrarTransacao(transacao)
    const registro1 = RegistrarTransacao(transacao1)
    const registro2 = RegistrarTransacao(transacao2)
    const registro3 = RegistrarTransacao(transacao3)

    expect(registro.account['available-limit']).toBe(80)
    expect(registro.violations).toHaveLength(0)

    expect(registro1.account['available-limit']).toBe(60)
    expect(registro1.violations).toHaveLength(0)

    expect(registro2.account['available-limit']).toBe(40)
    expect(registro2.violations).toHaveLength(0)

    expect(registro3.account['available-limit']).toBe(40)
    expect(registro3.violations).toHaveLength(1)
    expect(registro3.violations[0]).toBe(HIGH_FREQUENCY_SMALL_INTERVAL)
  })

  test('Não deve criar transação porque viola a regra de transação duplicada', () => {
    const conta = umaConta()
    ContasRegistradas.registarConta(conta)

    const transacao = { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:02.000Z" }
    const transacao1 = { "merchant": "Burger King", "amount": 20, "time": "2019-02-13T11:00:02.000Z" }

    const registro = RegistrarTransacao(transacao)
    const registro1 = RegistrarTransacao(transacao1)

    expect(registro.account['available-limit']).toBe(80)
    expect(registro.violations).toHaveLength(0)

    expect(registro1.account['available-limit']).toBe(80)
    expect(registro1.violations).toHaveLength(1)
    expect(registro1.violations[0]).toBe(DOUBLE_TRANSACTION)
  })
})
