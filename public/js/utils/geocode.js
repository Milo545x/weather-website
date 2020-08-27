const request = require('request')

const geocode = (address, callback) =>{
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address)+'.json?access_token=pk.eyJ1IjoibmdhaG1pbG8iLCJhIjoiY2tlOHBqY3VsMGxiMDJ5cHhneXNqd2NoeSJ9.v0ckkGZgQYlxrxxDLdf0xQ&limit=1';

    request({ url : geocodeUrl, json : true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const placeName = body.features[0].place_name
            callback(undefined, {
                latitude :  latitude,
                longitude : longitude,
                Location : placeName
            })
        }
    })

}

module.exports = geocode