const mosca = require('mosca')
const express = require('express')
const routers = require('./routers.js')

const app = express()
const setting = {
	port: 1883
}
const server = new mosca.Server(setting)

server.on('ready', () => {
	console.log('Ready')
})

server.on('clientConnected', () => {
	console.log('ClientConnected')
})

server.on('clientDisconnected', client => {
	console.log(`Client disconnected: ${client}`)
})

server.on('published', (packet, client) => {
	if (/[a-z]/.test(packet.payload.toString())) return 0
	const topic = packet.topic
	// if (/\w*\/DHT11/.test(topic)) {
	// 	const data = /(\d*) (\d*)/.exec(packet.payload.toString())
	// 	console.log(`Humidity: ${data[1]}`)
	// 	console.log(`Temp: ${data[2]}\n`)
	// }
	if (/PARQUE\/WEATHER\/INSIDE/.test(topic)) {
		const value = /(\d*) (\d*) (\d*)/.exec(packet.payload.toString())
		console.log(packet.payload.toString())
		// addData(value[1], value[2], value[3])
		// addPollutionData(data
	}
})

routers(app)

module.exports = app
