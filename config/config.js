// **************************************************
// * Winston logger properties
// **************************************************
module.exports.logger = {
    file: {
        level: 'debug'
    },
    console: {
        level: 'info'
    }
}

// **************************************************
// * DB Connection properties 
// **************************************************
module.exports.db = {
    host: 'localhost',
    port: 1433,
    database: 'CRMLITE',
    user: 'admin',
    password: 'admin',
    dialect: 'sqlite'
}