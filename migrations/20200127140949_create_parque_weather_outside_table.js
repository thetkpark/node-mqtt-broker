exports.up = function(knex) {
	return knex.schema.createTable('parque_weather_outside', function(table) {
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.integer('pm1')
		table.integer('pm25')
		table.integer('pm10')
		table.integer('humidity')
		table.integer('temp')
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable('parque_weather_outside')
}
