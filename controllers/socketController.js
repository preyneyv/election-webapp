let clientCount = 0

module.exports = (io) => {
	io.on('connection', (socket) => {
		clientCount++
		socket.emit("message", "hi")
		socket.on('disconnect', () => clientCount--)
		console.log(`${clientCount} CLIENT${clientCount != 1 ? "S ARE" : " IS"} CONNECTED`)
	})
}