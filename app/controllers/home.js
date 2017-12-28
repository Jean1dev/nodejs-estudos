module.exports.index = function(app, req, res){

	var connection = app.config.database();
	var noticiasMOdel = new app.app.models.NoticiasDAO(connection);

	noticiasMOdel.getUltimasNoticias(function(err, result){
		res.render('home/index', {noticias : result});
	});
};