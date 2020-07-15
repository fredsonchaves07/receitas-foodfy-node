const dados = require('../app/data.json')

module.exports = {
    index(req, res){
        return res.render('admin/recipes/index', {receitas: dados.receitas})
    }

}
/*
//create
exports.create = function(req, res){
    return res.render('admin/recipes/create')
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

    return res.render('admin/recipes/show.njk', {receita: foundReceita})
}

//edit
exports.edit = function(req, res){
    const {id} = req.params

    const foundReceita = dados.receitas.find(function(receita){
        return receita.id == id
    })

    if(!foundReceita){
        return res.send('Receita não encontrada')
    }

    receita = {
        ...foundReceita
    }

    return res.render('admin/recipes/edit.njk', {receita})
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
*/