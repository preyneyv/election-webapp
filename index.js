const path = require('path')

global.include = (file) => require(path.resolve(file))
global.config = include('config.json')

const bodyParser = require('body-parser')
const clientSession = require('client-sessions')
const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = config.port || 3000

include('database')

app.use(fileUpload())
app.use(clientSession({
	cookieName: "session",
	secret: config.sessionSecret
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
	req.post = req.body
	req.get = req.query
	res.file = (file) => res.sendFile(path.resolve(file))
	next()
})

// mount static content
app.use(express.static(path.resolve("static")))

include('routes/clientRoutes')(app)
include('routes/adminRoutes')(app)

include('controllers/socketController')(io)

server.listen(port, () => console.log(`App server started on port ${port}!`))