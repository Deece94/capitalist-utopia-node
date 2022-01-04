const auth = require('basic-auth')

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
        const decodedToken = await jwt.verify(request.token, process.env.TOKEN)
        request.decodedToken = decodedToken
        console.log(decodedToken);
    } catch (error) {
        request.decodedToken = null
        console.log(error.message);

    }

    next()
}

const authVerifier = async (request, response, next) => {
    const credentials = auth(request);
    if(credentials){
        // Compare given username and password with saved ones
        if(credentials.name === process.env.CLIENT_KEY && credentials.pass === process.env.CLIENT_SECRET){
            request.authorized = true;
        } else{
            request.authorized = false;
        }
    } else{
        request.authorized = null;
    }
    console.log(request.authorized);

    next()
}


module.exports = {
    unknownEndpoint,
    errorHandler,
    authVerifier
}