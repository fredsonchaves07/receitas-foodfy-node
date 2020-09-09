const Chefs = require('../models/Chefs')
const File = require('../models/File')
const fs = require('fs')

module.exports = {
    async index(req, res){
        const results = await Chefs.all()
        const chefs = results.rows

        //TODO - Melhorar lógica de replace do caminho da imagem
        for(let i = 0; i < chefs.length; i ++){
            chefs[i].avatar = chefs[i].avatar.replace('public', '')
        }

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

        result = await File.find(chef.file_id)
        const avatarChef = result.rows[0].path.replace('public', '')

        if(!chef){
            return res.send('Chef not found!')
        }

        return res.render('admin/chefs/show', {chef, avatarChef})
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