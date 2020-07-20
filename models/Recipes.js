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
            on chefs.id = recipes.chef_id
            WHERE recipes.id = $1
        `

        return db.query(query, [id])
    },

    create(data){
        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
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

    },

    update(data){
        const query = `
            UPDATE recipes
            SET image = $1,
                title = $2,
                ingredients = $3,
                preparation = $4,
                information = $5,
                chef_id = $6
            WHERE id = $7
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef_id,
            data.id
        ]

        return db.query(query, values)
    }
}
