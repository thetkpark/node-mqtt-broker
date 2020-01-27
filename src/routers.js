const knex = require('../db/knex')

const routes = app => {
	app.get('/', (req, res) => {
		res.send('HEllo')
	})

	app.get('/api/now', async (req, res) => {
		const data = await knex
			.select('*')
			.from('parque_weather_outside')
			.orderBy('created_at', 'desc')
			.limit(1)
		res.send(data)
	})

	app.get('/api/avg', async (req, res) => {
		const now = Date.now()
		// const data = await knex
		// 	.select('*')
		// 	.from('parque_weather_outside')
		// 	.whereBetween('created_at', [])
	})
}

module.exports = routes
