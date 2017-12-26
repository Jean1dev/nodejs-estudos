var app = require('./config/config');
var rotaNoticias = require('./app/routes/noticias')(app);

var rotaHome = require('./app/routes/home')(app);

var rotaForm = require('./app/routes/formulario')(app);
//routesNoticias(app);

app.listen(3000, function(){
	console.log("sai da frente satanas, fida peste eta porra");
});