const db = require('../config/db')

module.exports = {
    all(callback){
        return
    },

    chefList(){
        const query = `
            SELECT id, name  FROM chefs
        `

        return db.query(query)
    },

    update(data){
        console.log(data)

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
