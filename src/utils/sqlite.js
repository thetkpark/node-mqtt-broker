const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(':memory:', err => {
	if (err) return console.log(err.message)
	console.log('Successful connection to db')
})

const sql_create = `CREATE TABLE IF NOT EXISTS pms3003(timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, pm1 INT, pm25 INT, pm10 INT)`

db.run(sql_create, err => {
	if (err) return console.error(err.message)
	console.log('Successful create the pms3003 table')
})

const addData = (pm1, pm25, pm10) => {
	const sql_insert = `INSERT INTO pms3003 (pm1, pm25, pm10) VALUES(
		${pm1}, ${pm25}, ${pm10})`

	db.run(sql_insert, err => {
		if (err) console.error(err.message)
		// console.log('Successful insert data')
	})
}

// const readData = () => {
// 	const sql_select = `SELECT * FROM pms3003 ORDER BY timestamp LIMIT 1`
// 	db.all(sql_select, (err, rows) => {
// 		if (err) console.error(err.message)
// 		console.log('Successful select data')
// 		console.log(rows)
// 		return rows
// 	})
// }

module.exports = { addData, db }
