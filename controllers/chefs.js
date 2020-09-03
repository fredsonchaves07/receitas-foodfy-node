const Chefs = require('../models/Chefs')
const File = require('../models/File')

module.exports = {
    index(req, res){
        Chefs.all((chefs) => {

            //TODO - Melhorar lógica de replace do caminho da imagem
            for(let i = 0; i < chefs.length; i ++){
                chefs[i].avatar = chefs[i].avatar.replace('public', '')
            }

            return res.render('admin/chefs/index', {chefs})
        })
        
    },

    create(req, res){
        return res.render('admin/chefs/create')
    },

    async post(req, res){
        console.log(req.files)
        console.log(req.files[0])

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
        const dataFiles = {
            ...req.files,
            chef_id: req.body.id
        }

        console.log(req.body)
        console.log(req.files)

        await File.update(dataFiles)

        await Chefs.update(req.body)
        
        return res.redirect('/admin/chefs')

    },

    async delete(req, res){
        await Chefs.delete(req.body.id)

        return res.redirect('/admin/chefs')
    }
}