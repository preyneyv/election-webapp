const clientController = include('controllers/clientController')

module.exports = (app) => {
	app.get('/', (req, res) => res.file('views/app.html'))

	app.get('/candidates', clientController.getCandidates)
	
}