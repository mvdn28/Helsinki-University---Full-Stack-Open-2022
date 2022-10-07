const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()



const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
console.log(mongoUrl)
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})