const funcao = require('../../../src/deny-list/service/AdicionarEstabelecimentoNaListaDeProibidos')
const { ACCOUNT_NOT_INITIALIZED } = require('../../../src/violations')
const criarContaFnc = require('../../../src/conta/service/CriarConta')

describe('AdicionarEstabelecimentoNaListaDeProibidos testes', () => {
  test('nao deve adicionar estabelecimento na lista porque a conta nao foi iniciada', () => {
    const input = {"deny-list": ["merchant-A", "merchant-B"]}
    const retorno = funcao(input)

    expect(retorno.account).toStrictEqual({})
    expect(retorno.violations).toHaveLength(1)
    expect(retorno.violations[0]).toBe(ACCOUNT_NOT_INITIALIZED)
  })

  test('deve adicionar estabelecimento na lista de estabelecimentos proibidos', () => {
    const conta = { 'active-card': true, 'available-limit': 100 }
    const contaCriada = criarContaFnc(conta)

    const input = {"deny-list": ["merchant-A", "merchant-B"]}
    const retorno = funcao(input)

    expect(retorno.account).toHaveProperty('deny-list')
    expect(retorno.account).toHaveProperty('active-card')
    expect(retorno.account).toHaveProperty('available-limit')

    expect(retorno.account['deny-list']).toBe(input['deny-list'])
    expect(retorno.account['active-card']).toBe(conta['active-card'])
    expect(retorno.account['available-limit']).toBe(conta['available-limit'])
  })
})
