const connectToMongo = require('./db')
connectToMongo();
const express = require('express')
const cors = require('cors')
const port = 5000

const app = express()
 
app.use(cors())

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/passwords', require('./routes/passwords'));


app.listen (port, () => {
    console.log(`The app is listening at http://localhost:${port}`)
})
