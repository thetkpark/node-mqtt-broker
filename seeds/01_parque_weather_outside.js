exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('parque_weather_outside')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('parque_weather_outside').insert([
				{ pm1: 1, pm25: 2, pm10: 3, humidity: 50, temp: 26 },
				{ pm1: 4, pm25: 6, pm10: 2, humidity: 55, temp: 27 },
				{ pm1: 10, pm25: 5, pm10: 8, humidity: 50, temp: 27 },
				{ pm1: 9, pm25: 30, pm10: 20, humidity: 55, temp: 28 },
				{ pm1: 20, pm25: 30, pm10: 20, humidity: 55, temp: 28 }
			])
		})
}
