const fs = require('fs')
const path = require('path')
const processarEventos = require('../src/processarEventos')
const ContasRegistradas = require('../src/conta/ContasRegistradas')
const { clear: clearDenyList } = require('../src/deny-list/Denylist')

describe('testes de ponta a ponta da aplicação', () => {

  afterEach(() => {
    ContasRegistradas.clear()
    clearDenyList()
  })

  test('nao deve autorizar a transacao porque o estabelecimento esta proibido', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'MERCHANT_DENIED.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'merchant_denied.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Criando conta com sucesso', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'CRIAR_CONTA_SUCESSO.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'criar_conta_sucesso.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Criando uma conta que viola a lógica do Autorizador', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'VIOLAR_LOGICA_CRIAR_CONTA.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'violar_logica_autorizador.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando uma transação com sucesso', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'TRANSACAO_COM_SUCESSO.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'transacao_com_sucesso.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando uma transação que viola a lógica account-not-initialized', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'ACCOUNT_NOT_INITIALIZED.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'account_not_initialized.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando uma transação que viola a lógica card-not-active', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'CARD_NOT_ACTIVE.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'card_not_active.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando uma transação que viola a lógica insufficient-limit', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'INSUFFICIENT_LIMIT.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'insufficient_limit.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando uma transação que viola a lógica high-frequency-small-interval', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'HIGH_FREQUENCY_SMALL_INTERVAL.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'high_frequency_small_interval.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando uma transação que viola a lógica doubled-transaction', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'DOUBLED_TRANSACTION.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'double_transaction.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })

  test('Processando transações que violam multiplas lógicas', () => {
    const file = fs.readFileSync(path.resolve(__dirname, '..', 'exemplos', 'MULTIPLAS_VALIDACOES.json'))
    const parsed = JSON.parse(file)
    processarEventos(parsed)

    const esperado = fs.readFileSync(path.resolve(__dirname, 'respostas', 'multiplas_validacoes.json'))
    const repostaParsed = JSON.parse(esperado)

    const respostaGeradaPelaApplication = fs.readFileSync(path.resolve(__dirname, '..', 'operations-output'))
    const eventoParsed = JSON.parse(respostaGeradaPelaApplication)

    expect(repostaParsed).toStrictEqual(eventoParsed)
  })
})
