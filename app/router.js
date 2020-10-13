const express = require('express')
const routes = express.Router()
const recipesController = require('../controllers/recipesController')
const chefsController = require('../controllers/chefsController')
const siteController = require('../controllers/siteController')
const multer = require('../middlewares/multer')

/*Main Route */
routes.get('/', siteController.index)
routes.get('/about', siteController.about)
routes.get('/recipes', siteController.recipes)
routes.get('/recipes/:id', siteController.showRecipe)
routes.get('/chefs', siteController.chefs)
routes.get('/filter', siteController.filter)

//Rotas para página administrativa
routes.get('/admin', function(req, res){
    return res.redirect('/admin/recipes')
})

//Admin -> Recipes
routes.get('/admin/recipes', recipesController.index)
routes.get('/admin/recipes/create', recipesController.create)
routes.get('/admin/recipes/:id', recipesController.show)
routes.get('/admin/recipes/:id/edit', recipesController.edit)

routes.post('/admin/recipes', multer.array("photo_recipe", 5), recipesController.post)
routes.put('/admin/recipes', multer.array("photo_recipe", 5), recipesController.put)
routes.delete('/admin/recipes', recipesController.delete)

//Admin -> Chefs
routes.get('/admin/chefs', chefsController.index)
routes.get('/admin/chefs/create', chefsController.create)
routes.get('/admin/chefs/:id', chefsController.show)
routes.get('/admin/chefs/:id/edit', chefsController.edit)

routes.post('/admin/chefs', multer.array("photo_chef", 1), chefsController.post)
routes.put('/admin/chefs', multer.array("photo_chef", 1), chefsController.put)
routes.delete('/admin/chefs', chefsController.delete)

module.exports = routes