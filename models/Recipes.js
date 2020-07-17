const db = require('../config/db')

module.exports = {
    all(){
        const query = `
            SELECT 
                chefs.name as author,
                recipes.*
            FROM recipes
            INNER JOIN chefs
            on chefs.id = recipes.id
        `
        return db.query(query)
    },

    chefList(){
        const query = `
            SELECT id, name  FROM chefs
        `

        return db.query(query)
    },

    find(id){
        const query = `
            SELECT 
                chefs.name as author,
                recipes.*
            FROM recipes
            INNER JOIN chefs
            on chefs.id = recipes.id
            WHERE recipes.id = $1
        `

        return db.query(query, [id])
    },

    update(data){
        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            new Date().toISOString()
        ]

        return db.query(query, values)

    }
}
