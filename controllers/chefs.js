const Chefs = require('../models/Chefs')

module.exports = {
    index(req, res){
        Chefs.all((chefs) => {
            return res.render('admin/chefs/index', {chefs})
        })
        
    },

    create(req, res){
        return res.render('admin/chefs/create')
    },

    post(req, res){
        /*await Chefs.create(req.body)*/
        console.log(req.body)
        console.log(req.files)

        return res.redirect('/admin/chefs')
    },

    async show(req, res){
        
        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]
        /*result = await Chefs.recipeList(req.params.id)
        const recipes = result.rows
        const contRecipes = recipes.length*/

        if(!chef){
            return res.send('Chef not found!')
        }

        return res.render('admin/chefs/show', {chef, /*recipes, contRecipes*/})
    },

    async edit(req, res){
        let result = await Chefs.find(req.params.id)
        const chef = result.rows[0]
        /*result = await Chefs.recipeList(req.params.id)
        const recipes = result.rows*/

        if(!chef){
            return res.send('Chef not found!')
        }
        
        return res.render('admin/chefs/edit', {chef, /*recipes*/})
    
    },

    async put(req, res){
        await Chefs.update(req.body)
        
        return res.redirect('/admin/chefs')

    },

    async delete(req, res){
        await Chefs.delete(req.body.id)

        return res.redirect('/admin/chefs')
    }
}