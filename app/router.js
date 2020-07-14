const express = require('express')
const routes = express.Router()
const dados = require('./data.json')
const receitas = require('../controllers/receitas')
const chefs = require('../controllers/chefs')

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
routes.get('/admin', function(res){
    return res.redirect('admin/receitas')
})

//Admin -> Recipes
routes.get('/admin/receitas', receitas.index)
routes.get('/admin/receitas/create', receitas.create)
routes.get('/admin/receitas/:id', receitas.show)
routes.get('/admin/receitas/:id/edit', receitas.edit)

routes.post('/admin/receitas', receitas.post)
routes.put('/admin/receitas', receitas.put)
routes.delete('/admin/receitas', receitas.delete)

//Admin -> Chefs

routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)

module.exports = routes