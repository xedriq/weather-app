const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieGVkcmlxIiwiYSI6ImNqeXJnZmZpZTBhd2EzaG82emViMnlndjgifQ.w5nKwMFFAMH7fTOiRyzFIA`

    request({ url, json: true }, (err, data) => {
        if (err) {
            callback('Unable to connect to location services.', undefined)
        } else if (data.body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        } else {
            const { body } = data
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode