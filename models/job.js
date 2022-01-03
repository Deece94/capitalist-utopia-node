const mongoose = require('mongoose')

// Set schema
const jobSchema = mongoose.Schema({
    name: String,
    description: String,
    dateCreated: Date,
    bids: [
        new mongoose.Schema({
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            bid: Number
        })
    ],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price: Number,
    frequency: {
        type: String,
        enum: ["weekly, fortnightly, monthly"]
    },
    completion: [Boolean],
    jobBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobBoard'
    },


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