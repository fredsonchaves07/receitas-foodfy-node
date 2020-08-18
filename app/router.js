const express = require('express')
const routes = express.Router()
const recipes = require('../controllers/recipes')
const chefs = require('../controllers/chefs')
const site = require('../controllers/site')
const multer = require('../middlewares/multer')

/*Main Route */
routes.get('/', site.index)
routes.get('/about', site.about)
routes.get('/recipes', site.recipes)
routes.get('/recipes/:id', site.showRecipe)
routes.get('/chefs', site.chefs)
routes.get('/filter', site.filter)

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

routes.post('/admin/chefs', multer.array("photo_chef", 2), chefs.post)
routes.put('/admin/chefs', multer.array("photo_chef", 2), chefs.put)
routes.delete('/admin/chefs', chefs.delete)

module.exports = routes