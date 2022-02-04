/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if(process.argv.length < 3) {
  console.log('arguments are missing!!')
  console.log('cmd format to display existing persons: node mongo.js <password>')
  console.log('cmd format to add a new person: node mongo.js <password> <name> <number>')
  console.log('cmd format to add a new person (name contains whitespace): node mongo.js <password> "<name>" <number>')
  process.exit(1)
}

if(process.argv.length > 5) {
  console.log('number of arguments exceeds the required number!!')
  console.log('cmd format to display existing persons: node mongo.js <password>')
  console.log('cmd format to add a new person: node mongo.js <password> <name> <number>')
  console.log('cmd format to add a new person (name contains whitespace): node mongo.js <password> "<name>" <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://new-user00:${password}@cluster0.2l2wu.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else if(process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}