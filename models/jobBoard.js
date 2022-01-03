const mongoose = require('mongoose')

// Set schema
const jobBoardSchema = mongoose.Schema({
    name: String, 
    startDate: Date,
    status: {
        type: String,
        enum: ["bidding", "active", "complete"]
    },

})

// Transform the data returned when fetching documents
jobBoardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('JobBoard', jobBoardSchema)