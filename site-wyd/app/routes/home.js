module.exports = function(app){
    app.get('/', function(req,res){
    	app.app.controllers.admin.formulario(app, req, res);
    });

    app.post('/salvar', function(req, res){
        app.app.controllers.admin.noticias_salvar(app, req, res);
   });

   app.get('/sucesso', function(req,res){
    app.app.controllers.admin.sucesso(app, req, res);
});
}