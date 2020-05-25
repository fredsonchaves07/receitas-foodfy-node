const dados = require('../data.json')

//index
exports.index = function(req, res){
    return res.render('admin/receitas', {receitas: dados.receitas})
}

//show
exports.show = function(req, res){
    const {id} = req.params

    const foundReceita = dados.receitas.find(function(receitas){
        return receitas.id == id
    })

    if(!foundReceita){
        return res.send('Receita não encontrada')
    }

    return res.render('admin/show.njk', {receita: foundReceita})
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