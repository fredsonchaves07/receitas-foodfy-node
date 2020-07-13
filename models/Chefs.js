const db = require('../config/db')

module.exports = {
    all(callback){
        const query = `
            SELECT * FROM chefs
        `

        db.query(query, (err, results) => {
            if(err){
                throw `Database Error! ${err}`
            }
            
            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO chefs (
                avatar_url,
                name,
                created_at
            ) VALUES ($1, $2, $3)
        `

        const values = [
            data.avatar_url,
            data.name,
            new Date().toISOString()
        ]

        db.query(query, values, (err, results) => {
            if(err){
                throw `Database Error! ${err}`
            }

            callback()
        })
    },

    find(id, callback){
        const query = `
            SELECT * FROM chefs
            WHERE id = $1
        `

        const value = [id]

        db.query(query, value, (err, results) => {
            if(err){
                throw `Database error! ${err}`
            }

            callback(results.rows[0])
        })
    }
}