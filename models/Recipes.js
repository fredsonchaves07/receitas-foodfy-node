const db = require('../config/db')

module.exports = {
    all(){
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
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.chef_id,
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
            SET title = $1,
                ingredients = $2,
                preparation = $3,
                information = $4,
                chef_id = $5
            WHERE id = $6
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef_id,
            data.id
        ]

        return db.query(query, values)
    },

    delete(id){
        const query = `
            DELETE FROM recipes
            WHERE id = $1
        `

        return db.query(query, [id])
    },

    createRecipeFile(file_id, recipe_id){
        const query = `
            INSERT INTO recipe_files (
                file_id,
                recipe_id
            )
            VALUES (${file_id}, ${recipe_id})
        `

        return db.query(query)
    },

    findRecipeFile(recipe_id){
        const query = `
            SELECT * FROM recipe_files 
            WHERE recipe_id = ${recipe_id}
        `

        return db.query(query)
    },

    deleteRecipeFile(recipe_id){
        const query = `
            DELETE FROM recipe_files
            WHERE recipe_id = ${recipe_id}
        `

        return db.query(query)
    }
}
