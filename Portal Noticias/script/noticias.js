var http = require('http');

var server = http.createServer( function(req, res){

	var categoria = req.url;

	if(categoria == '/tecnologia'){
		res.write("tecnologia");
	}else if(categoria == '/moda'){
		res.write("moda");
	}else{
		res.write("portal de noticias");	
	}
	
});

server.listen(3000);