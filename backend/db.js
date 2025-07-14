const {Pool} = require('pg')

// setting up user accounts with Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5173,
    password: "1234",
    database: "minibank"
})

module.exports = pool