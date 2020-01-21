const mosca = require('mosca')

const setting = {
    port: 1883
}

const server = new mosca.Server(setting)

server.on('ready', () => {
    console.log('Ready');
})


server.on('clientConnected', (client) => {
    console.log(`Client connected: ${client}`);
})

server.on('clientDisconnected', (client) => {
    console.log(`Client disconnected: ${client}`);
})

server.on('published', (packet, client) => {
    console.log(packet);
})