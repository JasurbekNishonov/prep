const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')

// .env
dotenv.config()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
  }))

app.use('/', require('./routes/authRoute'))
app.use('/', require('./routes/transactionRoutes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.log(`Server is running on: ${PORT}`))
