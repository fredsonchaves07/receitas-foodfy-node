const db = require('../config/db')
const fs = require('fs')

module.exports = {

    create(file){
        try {
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
        } catch (error) {
            console.log(error)
        }
    },

    find(id){
        try {
            const query = `
                SELECT * FROM files
                WHERE id = ${id}
            `
            return db.query(query)
        } catch (error) {
            console.log(error)
        }
    },

    update(file, id){
        try {
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
        } catch (error) {
            console.log(error)
        }

    },

    delete(id){
        try {
            const query = `
                DELETE FROM files
                WHERE id = ${id}
            `

            return db.query(query)
        } catch (error) {
            console.log(error)
        }

    }
}