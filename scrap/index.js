const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const dados = [{
    nome: "augustinh",
    cpf: "058.332.519.07",
    idade: 22,
    sexo: "f",
    email: "jeanlucafp"
},
{
    nome: "mauricio",
    cpf: "058.332.519.07",
    idade: 22,
    sexo: "f",
    email: "mauricio@bolanos"
},
{
    nome: "pamela",
    cpf: "058.332.519.07",
    idade: 22,
    sexo: "f",
    email: "pamela@facebook"
},
{
    nome: "arnaldo",
    cpf: "058.332.519.07",
    idade: 22,
    sexo: "f",
    email: "arnaldo@paunocu"
}]

const run = async () => {
    dados.forEach(async i => {
        document.querySelector("#nome").value = i.nome
        document.querySelector("#cpf").value = i.cpf
        document.querySelector("#idade").value = i.idade
        document.querySelector("#sexo").value = i.sexo
        document.querySelector("#email").value = i.email
        console.log(`finalizou`)
        await sleep(20000)
    })
}

const gravar = () => {
    document
        .querySelector("#main-container > div.main-content > div > div > div > div > div.row > div > form > div.clearfix.form-actions > div > button")
        .click()
}
