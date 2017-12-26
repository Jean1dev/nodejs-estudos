var db = require('mysql');

var connection = function(){
		return DBconnection = db.createConnection({
			host : 'mysql857.umbler.com',
			user : 'user_test_bd',
			password : 'obscure1',
			database : 'neura_bd_teste',
			port : '41890'
	});
}

module.exports = function(){
	return connection;
};
