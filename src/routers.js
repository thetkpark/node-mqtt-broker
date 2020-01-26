// const pms3003Record = require('./utils/google_sheet')
const { db } = require('./utils/sqlite')

const routes = app => {
	app.get('/', (req, res) => {
		res.send('HEllo')
	})

	app.get('/api', (req, res) => {
		const sql_select = `SELECT * FROM pms3003 ORDER BY timestamp DESC LIMIT 1`
		db.all(sql_select, (err, rows) => {
			if (err) console.error(err.message)
			console.log('Successful select data')
			console.log(rows)
			res.send(rows[0])
		})
	})
}

module.exports = routes
