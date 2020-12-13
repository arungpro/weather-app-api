const request = require('request');

const getCoordinates = (address, callback) => {
    const geo_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNodWFydWciLCJhIjoiY2tpbGQ5NXZqMGgzdzJzcXFsOXVhYTU3biJ9.oq5gbKItwN7HcmNC4XO1dA&limit=1"
    request({url: geo_url, json: true}, (error, response, body) => {
        if (error) {
            callback("Unable to connect to server", undefined)
        } else if(body.features.length === 0 ) {
            callback("Wrong query search", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = getCoordinates