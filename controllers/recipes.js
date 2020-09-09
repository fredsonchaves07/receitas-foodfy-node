
const Recipes = require('../models/Recipes')

module.exports = {
    async index(req, res){
        const results = await Recipes.all()
        const recipes = results.rows

        return res.render('admin/recipes/index', {recipes})
    },

    async create(req, res){
        const results = await Recipes.chefList()
        const chefs = results.rows
        return res.render('admin/recipes/create', {chefs})
    },

    async post(req, res){
        await Recipes.create(req.body)

        return res.redirect('/admin/recipes')
    },

    async show(req, res){
        const results = await Recipes.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe){
            return res.send('Recipe not found!')
        }

        return res.render('admin/recipes/show.njk', {recipe})
    },

    async edit(req, res){
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]
        results = await Recipes.chefList()
        const chefs = results.rows

        if(!recipe){
            return res.send('Recipe not found!')
        }

        return res.render('admin/recipes/edit.njk', {recipe, chefs})
    },

    async put(req, res){
        await Recipes.update(req.body)
        const id = req.body.id

        return res.redirect(`/admin/recipes/${id}`)
    },

    async delete(req, res){
        await Recipes.delete(req.body.id)

        return res.redirect('/admin/recipes')
    }

}