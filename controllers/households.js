const householdsRouter = require('express').Router();
const Household = require('../models/household');

householdsRouter.get('/', async (request, response) => {
    try {
        Household.find({}).then(households => {
            response.json(households);
        });
    } catch (error) {
        return response.status(500).json({
            error: error
        });
    }

})

householdsRouter.get('/:id', async (request, response) => {
    try {
        Household.findById(request.params.id).then(household => {
            response.json(household)
        });
    } catch (error) {
        return response.status(500).json({
            error: error
        });
    }

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
            date_created: new Date(),
        })

        household.save().then(savedHousehold => {
            response.json(savedHousehold)
        })

    } catch (error) {
        return response.status(500).json({
            error: error
        });
    }

})

householdsRouter.delete('/:id', async (request, response) => {
    try {
        Household.findByIdAndRemove(request.params.id)
            .then(result => {
                response.status(204).end()
            })
            .catch(error => next(error))
    } catch (error) {
        return response.status(500).json({
            error: error
        });
    }
})

householdsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body

        const household = {
            name: body.name,
            date_created: new Date()
        }

        Household.findByIdAndUpdate(request.params.id, household, {
                new: true
            })
            .then(updatedhousehold => {
                response.json(updatedhousehold)
            })
            .catch(error => next(error))
    } catch (error) {
        return response.status(500).json({
            error: error
        });
    }
})

module.exports = householdsRouter