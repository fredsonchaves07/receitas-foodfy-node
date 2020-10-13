const Recipes = require('../models/Recipes')
const File = require('../models/File')
const fs = require('fs')

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
        let recipeFile = results.rows

        const imgs = await Promise.all(recipeFile.map(async file =>{
            results =  await File.find(file.file_id)
            const img = results.rows[0].path.replace('public', '')
            return img
        }))

        recipe.imagesFile = imgs

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
        let recipeFiles = results.rows

        for(file of recipeFiles){
            results = await File.find(file.file_id)
            let recipeImage = results.rows[0].path.replace('public', '')
            
            file.path = recipeImage
        }

        recipe.recipeFiles = recipeFiles
        
        return res.render('admin/recipes/edit.njk', {recipe, chefs})
    },

    async put(req, res){

        if(req.body.removed_files){
            const removedFiles = req.body.removed_files.split(',')

            removedFiles.forEach(async file =>  {

                let result = await File.find(file)
                fileData = result.rows[0]

                fs.unlinkSync(fileData.path)

                await Recipes.deleteRecipeFile(fileData.id)
                await File.delete(fileData.id)
            })
        }

        if(req.files){  
             req.files.forEach(async file =>  {
                let result = await File.create(file)
                let file_id = result.rows[0].id
                
                await Recipes.createRecipeFile(file_id, req.body.id)
            })
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },

    async delete(req, res){
        
        let result = await Recipes.findRecipeFile(req.body.id)
        const recipeFiles = result.rows

        await Recipes.deleteRecipeFileAll(req.body.id)

        recipeFiles.forEach(async file =>  {

            let result2 = await File.find(file.file_id)
            let fileData = result2.rows[0]
            
            fs.unlinkSync(fileData.path)

            await File.delete(fileData.id)
        })

        await Recipes.delete(req.body.id)

        return res.redirect('/admin/recipes')
    }

}