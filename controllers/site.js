const data = require('../models/Data')
const { chefs } = require('../models/Data')

module.exports = {
    async index(req, res){
        const results = await data.recipes()
        const recipes = results.rows

        return res.render('site/index', {recipes})
    },

    about(req, res){
        return res.render('site/about')
    },

    async recipes(req, res){
        const results = await data.recipes()
        const recipes = results.rows

        return res.render('site/recipes', {recipes})
    },

    async chefs(req, res){
        let results = await data.chefs()
        const chefs = results.rows

        return res.render('site/chefs', {chefs})
    },

    async showRecipe(req, res){
        const results = await data.findRecipe(req.params.id)
        let recipe = results.rows[0]

        if(!recipe){
            return res.send('Recipe not found!')
        }

        return res.render('site/show-recipe', {recipe})
    },

    async filter(req, res){
        const {filter} = req.query
        const results = await data.filter(req.query.filter)
        const recipes = results.rows
        return res.render('site/filter', {recipes, filter})
    }
}