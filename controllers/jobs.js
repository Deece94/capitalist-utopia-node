const jobsRouter = require('express').Router();
const Job = require('../models/job');

jobsRouter.get('/', async (request, response, next) => {
    try {
        Job.find({}).then(jobs => {
            if (jobs) {
                response.json(jobs);
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

jobsRouter.get('/:id', async (request, response, next) => {
    try {
        Job.findById(request.params.id).then(job => {
            if (job) {
                response.json(job);
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

jobsRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;

        if (body.name === undefined) {
            return response.status(400).json({
                error: 'name missing'
            })
        }

        const job = new Job({
            name: body.name,
            date_created: new Date(),
        })

        job.save().then(savedJob => {
            response.json(savedJob)
        })
        .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }

})

jobsRouter.delete('/:id', async (request, response, next) => {
    try {
        Job.findByIdAndRemove(request.params.id)
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

jobsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        const job = {
            name: body.name,
            date_created: new Date()
        }

        Job.findByIdAndUpdate(request.params.id, job, {
                new: true
            })
            .then(updatedJob => {
                response.json(updatedJob)
            })
            .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }
})

module.exports = jobsRouter