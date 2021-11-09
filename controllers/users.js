const usersRouter = require('express').Router();
const JobBoard = require('../models/job');

usersRouter.get('/', async (request, response, next) => {
    try {
        JobBoard.find({}).then(jobBoards => {
            if (jobBoards) {
                response.json(jobBoards);
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

usersRouter.get('/:id', async (request, response, next) => {
    try {
        JobBoard.findById(request.params.id).then(jobBoard => {
            if (jobBoard) {
                response.json(jobBoard);
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

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;

        if (body.name === undefined) {
            return response.status(400).json({
                error: 'name missing'
            })
        }

        const jobBoard = new JobBoard({
            name: body.name,
            date_created: new Date(),
        })

        jobBoard.save().then(savedJobBoard => {
            response.json(savedJobBoard)
        })
        .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }

})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        JobBoard.findByIdAndRemove(request.params.id)
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

usersRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        const jobBoard = {
            name: body.name,
            date_created: new Date()
        }

        JobBoard.findByIdAndUpdate(request.params.id, jobBoard, {
                new: true
            })
            .then(updatedJobBoard => {
                response.json(updatedJobBoard)
            })
            .catch(error => next(error))
    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }
})

module.exports = usersRouter