const householdsRouter = require('express').Router();
const Household = require('../models/household');

householdsRouter.get('/', async (request, response, next) => {
    try {
        Household.find({}).then(households => {
            if (households) {
                response.json(households);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }

})

householdsRouter.get('/:id', async (request, response, next) => {
    try {
        Household.findById(request.params.id).then(household => {
            if (household) {
                response.json(household);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }

})

householdsRouter.post('/', async (request, response, next) => {
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
        .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }

})

householdsRouter.delete('/:id', async (request, response, next) => {
    try {
        Household.findByIdAndRemove(request.params.id)
            .then(result => {
                response.status(204).end()
            })
            .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }
})

householdsRouter.put('/:id', async (request, response, next) => {
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
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }
})

module.exports = householdsRouter