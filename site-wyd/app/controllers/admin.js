const fs = require('fs');
const path = require('path');

module.exports.sucesso = function (app, req, res) {
    res.render('admin/sucesso', { validacao: {}, login: {} });
};


module.exports.formulario = function (app, req, res) {
    res.render('admin/form_add_noticia', { validacao: {}, login: {} });
};

module.exports.noticias_salvar = function (app, req, res) {
    var login = req.body;

    req.assert('login', 'Login  é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render('admin/form_add_noticia', { validacao: error, login: login });
        return;
    }

    const conteudo = `${login.login}
${login.senha}
RealName
SSN1
SSN2
Email
Telefone
Endereço
0`

    const dir = path.resolve(__dirname, '..', '..', '..', 'ImportUser', 'user.txt')
    fs.writeFile(dir, conteudo, function (err) {
        if (err) return console.log(err);
        res.redirect('/sucesso');
    });

};