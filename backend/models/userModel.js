const pool = require('../db')

const findUserByEmail = async (email) =>{
    const email_query = "SELECT * FROM users WHERE email = $1"
    const result = await pool.query(email_query, [email])
    return result.rows[0]
}

const createUser = async (username, email, hashedPassword) => {
    const register_query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    await pool.query(register_query, [username, email, hashedPassword]);
}

module.exports = {findUserByEmail, createUser}