module.exports = function(app){
    app.get('/formulario', function(req,res){
        res.render('admin/form_add_noticia');
    });

    app.post('/noticias/salvar', function(req, res){
    	var noticia = req.body;
    	
    	var connection = app.config.database();
    	var noticiasModel = new app.app.models.NoticiasDAO(connection);

    	noticiasModel.salvar(noticia, function(err, result){
    		res.redirect('/noticias');
    	});
    });
}