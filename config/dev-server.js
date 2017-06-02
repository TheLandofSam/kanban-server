import env from './env'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { defaultErrorHandler, corsOptions } from './handlers'//fx to be run if no one accepts req
import api from '../models'
import session from '../authentication/sessions'
import Auth from '../authentication/auth'

// ENABLE ROUTES IF USING app SIDE ROUTING
// import routes from './routes'

let app = express() ///express is our server
let server = require('http').createServer(app) //creating server from app...

function Validate(req, res, next) {
    // ONLY ALLOW GET METHOD IF NOT LOGGED IN 
    console.log(req.session)///send error if not logged in. login is only thing not protected, must be able to post to it...
    if (req.method !== 'GET' && !req.session.uid) { //if not using a GET re and are not logged in, return an error
        return res.send({ error: 'Please Login or Register to continue' })
    }
    return next()
}

function logger(req, res, next) {
    console.log('INCOMING REQUEST', req.url)
    next()
}

// REGISTER MIDDLEWARE
app.use(session)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', logger) //logger fx runs next
app.use('*', cors(corsOptions)) //only accept cors from certian places.This has been written for us. Calls next each time.
app.use('/', Auth)//this holds login-log out register methods

// LOCKS API TO REQUIRE USER AUTH
app.use(Validate)
app.use('/api', api)
app.use('/', defaultErrorHandler)

let io = require('socket.io')(server, {
    origins: '*:*'
})

io.on('connection', function (socket) {
    socket.emit('CONNECTED', {
        socket: socket.id,
        message: 'Welcome to the Jungle'
    })

    socket.on('update', (d) => {
        console.log(d)
    })

})

export default server