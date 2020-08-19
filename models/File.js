const db = require('../config/db')
const fs = require('fs')

module.exports = {
    create(file){
        const query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
        `   
        const values = [
            file.filename,
            file.path
        ]

        return db.query(query, values)
    },

    find(id){
        const query = `
            SELECT * FROM files
            WHERE id = ${id}
        `
        return db.query(query)
    }
}