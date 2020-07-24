const express = require('express')
const routes = express.Router()
const recipes = require('../controllers/recipes')
const chefs = require('../controllers/chefs')
const site = require('../controllers/site')

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

routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
/*
routes.get('/admin/recipes', recipes.index)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)
*/

routes.route('/admin/recipes')
  .get(recipes.index)
  .post(recipes.post)
  .put(recipes.put)
  .delete(recipes.delete)


//Admin -> Chefs
/*routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)
routes.patch('/admin/chefs', chefs.put)*/


routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.route('/admin/chefs')
  .get(chefs.index)
  .post(chefs.post)
  .put(chefs.put)
  .delete(chefs.delete)

module.exports = routes