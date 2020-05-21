const express = require('express')
const routes = express.Router()
const dados = require('./data')

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

module.exports = routes