const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const allRoutes = require('./routes/index')


dotenv.config()

//Connections
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log("connected to mongo") }
  )

 //middelware
  app.use(express.json())
  app.use(Cors())
  app.use(morgan('tiny'))
  app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`running`)
})

//Endpoints
app.use('/api', allRoutes)

//Get list


//Create todo


//Update todo


//Delete tdo
