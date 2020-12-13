const request = require('request');

const getWeather = ({latitude, longitude}, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=72f4b8a96f3a0659123a7899638d51e4&query="+latitude+","+longitude
    request({url: url, json: true}, (error, response, body) => {
        if(error){
            callback("Unexpected error", undefined);
        } else if(body.error) {
            callback("The weather API errored out", undefined);
        } else {
            callback(undefined, body);
        }
    })
};

module.exports = getWeather
