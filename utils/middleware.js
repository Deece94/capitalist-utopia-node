const jwt = require('jsonwebtoken')

// handle error requests
const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    });

}

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        });
    }

    next(error);
}

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    try {
        const decodedToken = await jwt.verify(request.token, process.env.SECRET)
        request.decodedToken = decodedToken
    } catch (error) {
        request.decodedToken = null
    }
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler
}