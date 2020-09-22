const Recipes = require('../models/Recipes')
const File = require('../models/File')

module.exports = {
    async index(req, res){
        const results = await Recipes.all()
        const recipes = results.rows

        for(recipe of recipes){
            let results = await Recipes.findRecipeFile(recipe.id)
            let fileId = results.rows[0].file_id
            
            results = await File.find(fileId)
            file = results.rows
            recipe.image = file[0].path.replace('public', '')
        }

        return res.render('admin/recipes/index', {recipes})
    },

    async create(req, res){
        const results = await Recipes.chefList()
        const chefs = results.rows
        return res.render('admin/recipes/create', {chefs})
    },

    async post(req, res){

        const result = await Recipes.create(req.body)
        const recipe_id = result.rows[0].id

        console.log(req.body)
        console.log(req.files)
        
         req.files.forEach(async file =>  {
            let result = await File.create(file)
            let file_id = result.rows[0].id
            
            await Recipes.createRecipeFile(file_id, recipe_id)
        })

        return res.redirect('/admin/recipes')
    },

    async show(req, res){
        let results = await Recipes.find(req.params.id)
        let recipe = results.rows[0]

        if(!recipe){
            return res.send('Recipe not found!')
        }

        results = await Recipes.findRecipeFile(recipe.id)
        let recipeFile = results.rows[0]

        results = await File.find(recipeFile.file_id)
        const img = results.rows[0].path.replace('public', '')

        recipe.image = img

        return res.render('admin/recipes/show.njk', {recipe})
    },

    async edit(req, res){
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe){
            return res.send('Recipe not found!')
        }

        results = await Recipes.chefList()
        const chefs = results.rows

        results = await Recipes.findRecipeFile(req.params.id)
        const recipeFiles = results.rows
        const recipeImages = []

        for(file of recipeFiles){
            results = await File.find(file.file_id)
            let recipeImage = results.rows[0].path.replace('public', '')
            recipeImages.push(recipeImage)   
        }

        recipe.images = recipeImages
        
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