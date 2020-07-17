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
        Chefs.create(req.body, () => {
            return res.redirect('/admin/chefs')
        })
    },

    async show(req, res){
        
        let results = await Chefs.find(req.params.id)
        const chef = results.rows[0]
        result = await Chefs.recipeList(req.params.id)
        const recipes = result.rows

        return res.render('admin/chefs/show', {chef, recipes})
    },

    edit(req, res){
        Chefs.find(req.params.id, (chef) => {
            if(!chef){
                return res.send('Chef not found')
            }

            return res.render('admin/chefs/edit', {chef})
        })
    },

    put(req, res){
        Chefs.update(req.body, () =>{
            return res.redirect('/admin/chefs')
        })
    },

    delete(req, res){
        Chefs.delete(req.body.id, () =>{
            return res.send('Excluiu')
        })
    }
}