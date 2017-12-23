var http = require("http");
var url = require("url");

var server = http.createServer(function (req, res){
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write("<h1>test</h1>");

	var result = url.parse(req.url, true);

	for (var i in result.query) {
		res.write(i + "->" + result.query[i] + "<br>");
	}

	res.write(req.url);
	res.write("<br>" + result.query["param"]);

	if(req.url == "/"){
		res.writeHead(200, {'Content-type': 'text/html'});
		res.write("<h1>OPA</h1>");
		res.write("<hr>");
	}else{
		res.writeHead(301, {Location: 'http://localhost:8080/'});
	}
});

server.listen(8080, function(){
	console.log("server on");
	/*var import = document.createElement('script');
	import.src = 'insertion_sort.js';
	document.head.appendChild(import);*/
});