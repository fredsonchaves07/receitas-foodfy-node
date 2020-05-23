const dados = require('../data.json')

//index
exports.index = function(req, res){
    return res.render('admin/receitas', {receitas: dados.receitas})
}

//show
exports.show = function(req, res){
    return res.send('ShowReceita')
}

//create
exports.create = function(req, res){

}

//edit
exports.edit = function(req, res){

}

//post
exports.post = function(req, res){


}

//put
exports.put = function(req, res){

}

//delete
exports.delete = function(req, res){

}