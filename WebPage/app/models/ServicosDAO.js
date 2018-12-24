function ServicosDAO(connection){

	this._connection = connection;
}

ServicosDAO.prototype.getAll = function(callback){
    this._connection.query('SELECT * FROM servicos', callback);
}

module.exports = function(){

	return ServicosDAO;
}