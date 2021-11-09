const mongoose = require('mongoose')

// Set schema
const jobSchema = mongoose.Schema({
    name: String,
    date_created: Date,
})

// Transform the data returned when fetching documents
jobSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Job', jobSchema)