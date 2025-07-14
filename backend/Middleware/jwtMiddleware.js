const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    
    // checking if the user has token
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   if(!token) return res.sendStatus(401)

    // if user has token:
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) throw res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {authenticateToken}