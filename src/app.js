const mosca = require('mosca')
const express = require('express')
const routers = require('./routers.js')

const app = express()
const setting = {
    port: 1883
}
const server = new mosca.Server(setting)

server.on('ready', () => {
    console.log('Ready');
})

server.on('clientConnected', () => {
    console.log('ClientConnected');
})

server.on('clientDisconnected', (client) => {
    console.log(`Client disconnected: ${client}`);
})

server.on('published', (packet, client) => {
    if(/[a-z]/.test(packet.payload.toString())) return 0;
    const topic = packet.topic
    if(/\w*\/DHT11/.test(topic)){
        const data = /(\d*) (\d*)/.exec(packet.payload.toString())
        console.log(`Humidity: ${data[1]}`);
        console.log(`Temp: ${data[2]}\n`);
    }
    if(/\w*\/PMS3003/.test(topic)){
        const data = /(\d*) (\d*) (\d*)/.exec(packet.payload.toString())
        console.log(`PM 1.0: ${data[1]}`)
        console.log(`PM 2.5: ${data[2]}`)
        console.log(`PM 10: ${data[3]}`)
    }
})


routers(app)

module.exports = app