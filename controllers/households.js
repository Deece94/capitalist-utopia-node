const householdsRouter = require('express').Router();
const Household = require('../models/household');

householdsRouter.get('/', async (request, response) => {
    Household.find({}).then(households => {
        response.json(households);
    });
})

householdsRouter.get('/:id', async (request, response) => {

})

householdsRouter.post('/', async (request, response) => {
    try {
        const body = request.body;

        if (body.name === undefined) {
            return response.status(400).json({
                error: 'name missing'
            })
        }
    
        const household = new Household({
            name: body.name,
            date: new Date(),
        })
    
        household.save().then(savedHousehold => {
            response.json(savedHousehold)
        })

    } catch(error) {
        console.log(error);
    }
    
})

householdsRouter.delete('/:id', async (request, response) => {

})

householdsRouter.put('/:id', async (request, response) => {

})

module.exports = householdsRouter