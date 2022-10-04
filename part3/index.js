const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.static('build'))

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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        return person.id === id
    })
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }

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
  const body = request.body

  if(!body.name){
      return response.status(404).json({
          error: 'Name missing'
      })
  }

  if(!body.number){
    return response.status(404).json({
        error: 'Number missing'
    })
  }

  let checkName = persons.some(e => e.name === body.name);

  if(checkName){
    return response.status(404).json({
      error: 'Name already exists in the phonebook'
  })
  }

  const person = {
      name: body.name,
      number: body.number,
      id: entriesNow()+1,
  }

  persons = persons.concat(person)
  response.json(person)
})

//--------------Middleware ----------------------



const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)