const db = require('../config/db')

module.exports = {
    all(){
        const query = `
            SELECT files.path as avatar, chefs.* 
            FROM chefs
            INNER JOIN files
            ON files.id = chefs.file_id
        `

        return db.query(query)
    },

    recipeList(id){
        const query = `
            SELECT chefs.id,
                   chefs.name as author,
                   recipes.image,
                   recipes.title,
                   recipes.id as recipeid
            FROM chefs
            INNER JOIN recipes
            ON chefs.id = recipes.chef_id
            WHERE chefs.id = $1
        `

        return db.query(query, [id])
    },

    create(data, fileId){
        const query = `
            INSERT INTO chefs (
                file_id,
                name,
                created_at
            ) VALUES ($1, $2, $3)
        `

        const values = [
            fileId,
            data.name,
            new Date().toISOString()
        ]

        return db.query(query, values)
    },

    find(id){
        const query = `
            SELECT files.path as avatar, chefs.* 
            FROM chefs
            INNER JOIN files
            ON files.id = chefs.file_id
            WHERE chefs.id = $1
        `

        return db.query(query, [id])
    },

    update(data){
        const query = `
            UPDATE chefs
            SET file_id = $1,
                name = $2
            WHERE id = $3
        `

        const values = [
            data.file_id,
            data.name,
            data.id
        ]

        return db.query(query, values)
    },

    delete(id){
        const query = `
            DELETE FROM chefs
            WHERE id = $1
        `
        return db.query(query, [id])
    }
}