/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => /\d{2,3}-\d{6,}/.test(v)
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)