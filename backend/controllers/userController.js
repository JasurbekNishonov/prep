const pool = require('../db')

// Method: GET
// @route: /user
// description: user profile
const getUser = async (req, res) => {
   try {
    const result = await pool.query('SELECT id, username, email, balance, created_at FROM users WHERE id=$1', [req.user.id])
    res.json(result.rows[0])
   } catch (error) {
    console.log(error);
   }
}

module.exports = { getUser }