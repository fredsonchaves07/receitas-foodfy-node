const Chefs = require('../models/Chefs')

module.exports = {
    index(req, res){
        Chefs.all((chefs) => {
            return res.render('admin/chefs/index', {chefs})
        })
        
    }
}