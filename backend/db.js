const {Pool} = require('pg')

// setting up user accounts with Pool
const pool = new Pool({
    host: "localhost",
    port: 5173,
    user: "postgres",
    password: "1234",
    database: "minibank",
  });

module.exports = pool