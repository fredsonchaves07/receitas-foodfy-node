const data = require('../models/Data')

module.exports = {
    index(req, res){
        return res.render('site/index')
    }
}