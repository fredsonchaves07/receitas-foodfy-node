const db = require('../config/db')

module.exports = {
    recipes(){
        const query = `
            SELECT 
            chefs.name as author,
            recipes.*
        FROM recipes
        INNER JOIN chefs
        on chefs.id = recipes.chef_id
        `

        return db.query(query)
    },

    findRecipe(id){
        const query = `
            SELECT 
            chefs.name as author,
            recipes.*
        FROM recipes
        INNER JOIN chefs
        on chefs.id = recipes.chef_id
        WHERE recipes.id = $1
        `

        return db.query(query, [id])
    },

    chefs(){
        const query = `
            SELECT chefs.*, count(recipes.title) as countrecipes
            FROM chefs
            LEFT JOIN recipes
            on chefs.id = recipes.chef_id
            GROUP BY chefs.id
        `

        return db.query(query)
    }
}