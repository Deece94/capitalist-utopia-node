const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
    try {
        User.find({}).then(users => {
            if (users) {
                response.json(users);
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
        User.findById(request.params.id).then(user => {
            if (user) {
                response.json(user);
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

        const user = new User({
            name: body.name,
            date_created: new Date(),
        })

        user.save().then(savedUser => {
            response.json(savedUser)
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
        User.findByIdAndRemove(request.params.id)
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

        const user = {
            name: body.name,
            date_created: new Date()
        }

        User.findByIdAndUpdate(request.params.id, user, {
                new: true
            })
            .then(updatedUser => {
                response.json(updatedUser)
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