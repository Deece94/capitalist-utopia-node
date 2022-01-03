const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;

        if (body.username === undefined) {
            return response.status(400).json({
                error: 'name missing'
            })
        }

        if (body.password === undefined) {
            return response.status(400).json({
                error: 'name missing'
            })
        }

        // Check if username matches a record
        const user = await User.findOne({ username: body.username })
        if (user === null){
            return response.status(401).json({
                error: 'invalid username'
            })
        }

        // Check if password matches user
        const passwordCorrect = await bcrypt.compare(body.password, user.password)

        if (!(passwordCorrect)) {
            return response.status(401).json({
                error: 'incorrect password'
            })
        }
        const userForToken = {
            username: user.username,
            id: user._id,
        }
    
        const token = jwt.sign(userForToken, process.env.SECRET)
    
        response
            .status(200)
            .send({ token, username: user.username, name: user.name })

    } catch (error) {
        console.log('error', error);
        response.status(500).send({
            error: error
        });
    }

})

module.exports = loginRouter