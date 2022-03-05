const request = require('request');

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8ec732a76834d7dfe6e0a692636dc41f&query=' + lat + ',' + long + '&units=m'
 
    request({ url, json: true }, (error, { body }) => {
       if (error) {
          callback('Unable to connect to weather service!', undefined)
       } else if (body.error) {
          callback('Error on response from weather stack!!' + JSON.stringify(body.error), undefined)
       } else {
          const data = body
          callback(undefined, 'The current weather in ' + body.location.name + ' is ' + body.current.weather_descriptions[0] + ' and ' + body.current.temperature + ' Deg C, feels like ' + body.current.feelslike + ' Deg C.' + ' Wind Speed is ' + body.current.wind_speed + ' (kph)  from ' + body.current.wind_degree + ' degrees.')
       }
    })
 
 }

 module.exports = forecast