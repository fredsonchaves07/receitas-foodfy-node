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

            console.log(results.rows)
            
            callback(results.rows)
        })
    }
}