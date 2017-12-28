function NoticiasDAO(connection){

	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
    this._connection.query('SELECT * FROM noticias ORDER BY data_noticia DESC', callback);
}

NoticiasDAO.prototype.getNoticia = function(callback){
	this._connection.query('SELECT * FROM noticias where idnoticias = 2', callback);
}


NoticiasDAO.prototype.salvar = function(noticia, callback){
	this._connection.query('INSERT INTO noticias SET ?', noticia, callback);
}

NoticiasDAO.prototype.getUltimasNoticias = function(callback){
	this._connection.query('SELECT * FROM noticias ORDER BY data_noticia DESC LIMIT 5', callback);
}

module.exports = function(){

	return NoticiasDAO;
}