if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const cors = require('cors');
const port = proccess.env.PORT || 3000
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log('nice to have you ' + port)
})
