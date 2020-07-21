const express = require('express')
const routes = express.Router()
const recipes = require('../controllers/recipes')
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
routes.get('/admin', function(req, res){
    return res.redirect('/admin/recipes')
})

//Admin -> Recipes
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

//Admin -> Chefs
routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)

module.exports = routes