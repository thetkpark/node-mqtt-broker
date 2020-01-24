const pms3003Record = require('./utils/google_sheet')

const routes = app => {
	app.get('/', (req, res) => {
		res.send(pms3003Record)
	})
}

module.exports = routes
