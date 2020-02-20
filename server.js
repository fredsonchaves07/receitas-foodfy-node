const express = require('express')
const nunjucks = require('nunjucks')
const dados = require('./data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})

server.get('/', function(req, res){
    res.render('index', {dados: dados})
})

server.get('/receitas', function(req, res){
    res.render('receitas', {dados: dados})
})

server.get('/sobre', function(req, res){
    res.render('sobre')
})

server.listen(5000, function(){
    console.log('Em Execução..')
})