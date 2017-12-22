var http = require("http");

var server = http.createServer(function (req, res){
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write("<h1>test</h1>");
});

server.listen(8080, function(){
	console.log("server on");
	/*var import = document.createElement('script');
	import.src = 'insertion_sort.js';
	document.head.appendChild(import);*/
});