const request = require('request')

const geoCode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmVub3RoYTAxIiwiYSI6ImNqdXdtaGpyMzA3djg0ZHBnNHNmNmkyb3YifQ.3QKLuVbfILxHBCsyyjRNvg&limit=1'
    request({url:url,json:true},(error,{body}) =>{
        if(error)
        {
            callback('Unable to connect the location service',undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to find the location. Please try for different Search Query',undefined)
        }
        else
        {
            callback(undefined,{
                latitude    :body.features[0].center[1],
                longititude : body.features[0].center[0],
                location    : body.features[0].place_name
            })
        }

    })

}

module.exports = geoCode