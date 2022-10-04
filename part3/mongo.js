const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://mvdn28:${password}@cluster0.memieqt.mongodb.net/noteApp?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length <= 3) {
  mongoose
    .connect(url)
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}else{
  const name = process.argv[3]
  const number = process.argv[4]
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: name,
      number: number
    })

    return person.save()
  })
  
  .then(() => {
    console.log('person saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}




  