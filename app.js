const express =  require('express')
const request = require('request');
const getCoordinates = require('./utils/geocode');
const getWeather = require('./utils/forcast');

const app = express()
const port = process.env.PORT || 3000

app.get('*', (req, resp) => {
    const place = req.query.place
    if(!place) {
        return resp.send("Please provide the place query string, For example https://$host$:$port$>?place=bangalore")
    }
    getCoordinates(place, (error, data) => {
        if(!error) {
            getWeather(data, (error, {current: res}) => {
                if(!error) {
                    resp.send({
                        location: data.location,
                        temperature: res.temperature
                    })
                } else {
                    resp.send(error);
                }
            })
        } else {
            resp.send(error);
        }
    });
})

app.listen(port)