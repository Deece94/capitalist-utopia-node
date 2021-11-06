const mongoose = require('mongoose')

const householdSchema = mongoose.Schema({
    title: String,
    author: String,
    users: []
})

householdSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Household', householdSchema)