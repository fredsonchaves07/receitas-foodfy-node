const Chefs = require('../models/Chefs')
const File = require('../models/File')
const fs = require('fs')
const Recipes = require('../models/Recipes')

module.exports = {
    async index(req, res){
        const results = await Chefs.all()
        const chefs = results.rows

        chefs.forEach(chef => {
            chef.avatar = chef.avatar.replace('public', '')
        })

        return res.render('admin/chefs/index', {chefs})
        
    },

    create(req, res){
        return res.render('admin/chefs/create')
    },

    async post(req, res){

        let result = await File.create(req.files[0])
        const fileId = result.rows[0].id

        await Chefs.create(req.body, fileId)

        return res.redirect('/admin/chefs')
    },

    async show(req, res){
        
        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]
        
        if(!chef){
        return res.send('Chef not found!')
        }

        results = await File.find(chef.file_id)
        const avatarChef = results.rows[0].path.replace('public', '')

        results = await Chefs.recipeList(req.params.id)
        const recipeChefList = results.rows

        recipeChefList.forEach(async recipe => {
            results = await Recipes.findRecipeFile(recipe.recipeid)
            console.log(results.rows)
        })


        return res.render('admin/chefs/show', {chef, avatarChef, recipeChefList})
},

    async edit(req, res){
        let result = await Chefs.find(req.params.id)
        const chef = result.rows[0]
        /*result = await Chefs.recipeList(req.params.id)
        const recipes = result.rows*/

        if(!chef){
            return res.send('Chef not found!')
        }

        chef.avatar = chef.avatar.replace('public', '')
        
        return res.render('admin/chefs/edit', {chef, /*recipes*/})
    
    },

    async put(req, res){
        const result = await File.find(req.body.file_id)
        
        fs.unlinkSync(result.rows[0].path)

        await File.update(req.files[0], req.body.file_id)
        await Chefs.update(req.body)

        return res.redirect('/admin/chefs')
    },

    async delete(req, res){
        await Chefs.delete(req.body.id)

        return res.redirect('/admin/chefs')
    }
}