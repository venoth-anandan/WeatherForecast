const request       = require('request');

const forecast      = (latitude,longitude,callback) => 
{
    const url = 'https://api.darksky.net/forecast/ba71157d8f461d347c8e7b252fe9240f/' + latitude + ',' + longitude
    request({url:url,json:true},(error,{body}) =>{
    if(error){
        callback("Unable to connect weather service",undefined)
    }
    else if(body.error)
    {
        callback("Unable to find location",undefined)
    }
    else
    {
        callback(undefined,body.daily.data[0].summary+"It is currently "+body.currently.temperature+" degrees out. There is a "+body.currently.precipProbability+"% chance of rain")
    }})
}

module.exports = forecast ;