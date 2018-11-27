var db = require('mysql');

var connection = function(){
		return DBconnection = db.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'obscure345',
			database : 'mydb',
			port : '3306'
	});
}

module.exports = function(){
	return connection;
};
