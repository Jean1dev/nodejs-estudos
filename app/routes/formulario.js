module.exports = function(app){
    app.get('/formulario', function(req,res){
        res.render('admin/form_add_noticia');
    });
}