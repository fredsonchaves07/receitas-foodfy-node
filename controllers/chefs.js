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

    show(req, res){
        Chefs.find(req.params.id, (chef) => {
            if(!chef){
                return res.send('Chef not found')
            }

            return res.render('admin/chefs/show', {chef})
        })
    }
}