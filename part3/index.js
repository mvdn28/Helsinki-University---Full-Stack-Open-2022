require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.static('build'))

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
    const entries = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return entries
}

//---------------GET--------------------------------
app.get('/api/persons', (request,response)=>{
  Person.find({})
    .then(persons =>{
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })

})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${entriesNow()} people</p>
        <p> ${new Date()} </p>`)
})

//------------------------------DELETE---------------------------

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

//--------------------------POST ---------------------------

app.post('/api/persons', (request, response) => {
  console.log(`It tryed to post`)
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

//--------------Middleware ----------------------



const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)