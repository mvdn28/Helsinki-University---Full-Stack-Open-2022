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
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.static('build'))
app.use(requestLogger)

const Person = require('./models/person')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
// -----------Functions ---------------------------
const entriesNow = () => {
  Person.countDocuments({}, function( err, count){
    return count
  })
}

//---------------GET--------------------------------
app.get('/api/persons', (request,response)=>{
  Person.find({})
    .then(persons =>{
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  })
  .catch(error=> next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({},function(err, count){
    console.log("Number of docs:",count)
    response.send(
      `<p>Phonebook has info for ${count} people</p>
      <p> ${new Date()} </p>`)
  })  
})

//------------------------------DELETE---------------------------

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(result=>{
        response.status(204).end()
      })
      .catch(error=>next(error))
  })

//--------------------------POST ---------------------------

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(body.name===undefined){
      return response.status(404).json({
          error: 'content missing'
      })
  }

  const person = new Person ({
      name: body.name,
      number:body.number
  })

  person.save()
    .then(savedPerson =>{
      response.json(savedPerson)
    })
})

//---------------PUT----------------------------
app.put('/api/persons/:id', (request,response, next)=>{
  const body = request.body
  
  const person={
    name: body.name,
    number:body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson=>{
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//--------------Middleware ----------------------

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