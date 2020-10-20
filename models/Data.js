const db = require('../config/db')

module.exports = {
    recipes(){
        try {
            const query = `
                SELECT 
                chefs.name as author,
                recipes.*
                FROM recipes
                INNER JOIN chefs
                on chefs.id = recipes.chef_id
            `

            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },

    findRecipe(id){
        try {
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
        } catch (error) {
            console.log(error)
        }

    },

    chefs(){
        try {
            const query = `
                SELECT chefs.*, count(recipes.title) as countrecipes
                FROM chefs
                LEFT JOIN recipes
                on chefs.id = recipes.chef_id
                GROUP BY chefs.id
            `

            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },

    filter(filter){
        try {
            const query = `
                SELECT recipes.*, chefs.name as author FROM recipes
                INNER JOIN chefs
                on chefs.id = recipes.chef_id
                WHERE title LIKE '%${filter}%'
            `

            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    }
}