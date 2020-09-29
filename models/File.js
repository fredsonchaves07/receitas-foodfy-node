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
    },

    update(file, id){
        const query = `
            UPDATE files
            SET name = $1,
                path = $2
            WHERE files.id = ${id}
        `

        const values = [
            file.filename,
            file.path,
        ]

        return db.query(query, values)
    },

    delete(id){
        const query = `
            DELETE FROM files
            WHERE id = ${id}
        `

        return db.query(query)
    }
}