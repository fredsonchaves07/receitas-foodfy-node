const express = require('express')
const routes = express.Router()
const dados = require('./data')
const receitas = require('./controllers/receitas')

routes.get('/', function(req, res){
    return res.render('index', {dados: dados})
})

routes.get('/receitas', function(req, res){
    return res.render('receitas', {dados: dados})
})

routes.get('/receitas/:id', function(req, res){
    const receita = dados
    const id = req.params.id

    return res.render('detalhes_receita', {receita: receita[id]})
})

routes.get('/sobre', function(req, res){
    return res.render('sobre')
})

//Rotas para página administrativa
routes.get('/admin/receitas', receitas.index)
routes.get('/admin/receitas/create', receitas.create)
routes.get('/admin/receitas/:id', receitas.show)
routes.get('/admin/receitas/:id/edit', receitas.edit)

routes.post('/admin/receitas', receitas.post)
routes.put('/admin/receitas', receitas.put)
routes.delete('/admin/receitas', receitas.delete)

module.exports = routes