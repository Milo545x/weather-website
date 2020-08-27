const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon=' + longitude +'&lang=fr&units=metric&appid=39dcdeb7faef1c06ac25de1e4e146a74'
    request({ url, json : true}, (err, {body}) =>{
        if(err){
            callback('Unable to connect to the weather services', undefined)
        }else if(body.message){
            callback('Unable to get location', undefined)
        }else{
            const summary = body.daily[0].weather[0].description
            const temperature = body.current.temp
            const precipProb = body.daily[0].pop
            const tempMin = body.daily[0].temp.min
            const tempMax = body.daily[0].temp.max
            callback(undefined, summary + ', Il fait ' + temperature + ' degrés celcius et il y\'a ' + precipProb + '% de chances de pleuvoir.'+ ' La temperature minimum de la journée est de ' + tempMin + ' degrés et la temperature maximum est de ' + tempMax + ' degrés')
        }
    })
}
module.exports = forecast