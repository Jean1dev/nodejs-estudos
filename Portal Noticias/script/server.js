var http = require("http");
var url = require("url");
var port = process.env.PORT || 1337;
var fs = require("fs");

var routes = function(page){
	var exist = fs.existsSync(__dirname + "/" + page + ".html");

	if(exist){
		return __dirname + page + ".html";
	}else{
		return "error_404.html";
	}
};

var server = http.createServer(function (req, res){
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write("<h1>test</h1>");

	var addresPath = url.parse(req.url).pathname;

	console.log(addresPath);

	if(addresPath == "/"){
		var page = "home.html";
	}else{
		var page = routes(addresPath);
	}

	fs.readFile(page, function(error, arquivo){
		if(error){
			res.end("error");
		}else{
			res.end(arquivo);
		}
	});

	//SINCRONO
	var arq = fs.readFileSync("nmarquivo.html");
	res.end(arq);

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

server.listen(port, function(){
	console.log("server on");
	/*var import = document.createElement('script');
	import.src = 'insertion_sort.js';
	document.head.appendChild(import);*/
});