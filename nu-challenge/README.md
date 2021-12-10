<h1 align="center">
    Code Challenge: Autorizador
</h1>

Bom dia, boa tarde ou boa noite meus caros avaliadores, espero que venhamos ser colegas de trabalho :D
Criticas, sugestões e comentarios são bem vindos

## :rocket: Sobre o projeto
  Geralmente em POC's, projetos iniciais ou challenge de trabalho tenho o habito de usar nodeJs, tem uma comunidade forte, é multi paradigma e também tenho minhas facilidades em seu uso, por isso a escolha dessa stack.
  É um projeto simples, porem bem feito e organizado que utiliza alguns conceitos de DDD e solid, como é uma fase inicial ele apenas inicia um while(true) e fica monitorando os arquivos, da forma que esta estruturado também é muito simples alterar a entrada de dados para um REST ou AMQP sem ter que alterar nada nos modulos de dominio.
  das libs estou utilizando o jest para o tests e o moment para facilitar o trabalho com datetime( pq sabe como é neh )

## :information_source: Como utilizar
Para rodar essa applicacao é preciso do [Node.js v10.16][nodejs] ou superior instalado no seu computador
```bash
# Instalar as dependencias
$ npm install

# Inicia o serviço
$ npm start

# Roda os testes
$ npm run test

# para exibir a cobertura de testes
$ npm run coverage
```

## :information_source: Funcionamento
Esse serviço fica monitorando a pasta raiz a procura do arquivo operations, quando o arquivo é criado ele faz a leitura desse arquivo deleta ele e gera um arquivo de output com o nome operations-output
caso ocorra algum erro durante a leitura ou parse, o programa é encerrado
O conteudo do arquivo tem que ser um Array de eventos json, deixei varios exemplos ali na pasta exemplo


ps: comecei a escrever o codigo em portugues, ai lembrei que a recruiter disse que a linguagem oficial da empresa era ingles
então se repararem em um "mix" de idiomas por favor considerem :D
