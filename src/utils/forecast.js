const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/371103a02fcf34dfea871e1c3943c6b6/${lat},${long}?units=auto&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const { apparentTemperature, precipProbability, } = body.currently
            const { temperatureHigh, temperatureLow } = body.daily.data[0]
            callback(undefined,
                `${body.daily.data[0].summary} It is currently ${apparentTemperature} °C out. There is ${(precipProbability * 100).toFixed(0)}% chance of rain. Highest temperature recorded today is ${temperatureHigh} °C and lowest is ${temperatureLow} °C.`
            )
        }
    })
}

module.exports = forecast