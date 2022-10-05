require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const requestLogger = (request, response, next) =>{
  console.log('Method:',request.method)
  console.log('Path:',request.path)
  console.log('Body:',request.body)
  console.log('---')
  next()
}


app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(requestLogger)

const Note = require('./models/note')
const { nextTick } = require('process')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

  
app.get('/api/notes', (request, response) => {
    Note.find({})
      .then(notes =>{
        response.json(notes)
      })
})

app.get('/api/notes/:id', (request, response,next) => {
  Note.findById(request.params.id)
  .then(note => {
    if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }
  })
  .catch(error =>{
    next(error)
  })
})

app.delete('/api/notes/:id', (request, response,next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result=>{
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request,response, next)=>{
  const body = request.body
  
  const note={
    content:body.content,
    important:body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updatedNote=>{
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content){
        return response.status(404).json({
            error: 'content missing'
        })
    }

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note.save()
      .then(savedNote =>{
        response.json(savedNote)
      })
})

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler=(error,request,response,next) =>{
  console.log(error.message)
  if(error.name === 'CastError'){
    return response.status(400).send({error:'malformatted id'})
  }

  next(error)
}


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)