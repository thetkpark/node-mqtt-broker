// let dht11Record = []
let pms3003Record = [5, 5, 5, 5, 5]

const addPollutionData = data => {
	pms3003Record.push(data)
}

module.exports = {
	addPollutionData,
	pms3003Record
}
