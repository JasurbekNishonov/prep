const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')

// .env
dotenv.config()

app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://prep-frontend.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/', require('./routes/authRoute'))
app.use('/', require('./routes/transactionRoutes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.log(`Server is running on: ${PORT}`))
