const criarContaFnc = require('../../../src/conta/service/CriarConta')
const { ACCOUNT_ALREADY_CREATED } = require('../../../src/violations')

describe('CriarContaService testes', () => {

  test('deve criar uma conta e retornar conforme esperado', () => {
    const conta = { 'active-card': true, 'available-limit': 100 }
    const contaCriada = criarContaFnc(conta)

    expect(contaCriada['account']).toStrictEqual(conta)
    expect(contaCriada['violations']).toHaveLength(0)
  })

  test('nao deve criar uma conta pois já existe conta criada, deve retornar a vialoção de acordo', () => {
    const conta = { 'active-card': true, 'available-limit': 100 }
    const contaCriada = criarContaFnc(conta)
    const outraContaCriada = criarContaFnc(conta)

    expect(outraContaCriada['account']).toStrictEqual(conta)
    expect(outraContaCriada['violations']).toHaveLength(1)
    expect(outraContaCriada['violations'][0]).toBe(ACCOUNT_ALREADY_CREATED)
  })
})
