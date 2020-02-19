const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

server.listen(5000, function(){
    console.log('Em Execução..')
})

server.get('/', function(req, res){
    res.render('index')
})