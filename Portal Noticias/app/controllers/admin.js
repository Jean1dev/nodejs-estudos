module.exports.formulario = function(app, req, res){
	res.render('admin/form_add_noticia', {validacao :{}, noticia :{}});
};

module.exports.noticias_salvar = function(app, req, res){
   	var noticia = req.body;
    	
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('noticia', 'Notícia é obrigatório').notEmpty();

        //var error = req.getValidationResult();
    var error = req.validationErrors();

    if(error){
        res.render('admin/form_add_noticia', {validacao: error,  noticia: noticia});
        return;
    }

   	var connection = app.config.database();
   	var noticiasModel = new app.app.models.NoticiasDAO(connection);

   	noticiasModel.salvar(noticia, function(err, result){
   		res.redirect('/noticias');
    });
};