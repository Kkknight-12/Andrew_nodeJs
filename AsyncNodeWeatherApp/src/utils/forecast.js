const request = require('request');

const foreCast = (latitude, longitute, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dbb804baf9663ae7581848f1c06d5652&query=' + latitude + ',' + longitute ;
    // const url = 'http://api.weatherstack.com/current?access_key=dbb804baf9663ae7581848f1c06d5652&query=' + latitude + ',' + longitute + '&units=f';

    request( { url, json: true}, (error, {body}) => {
        // console.log(resp.body)
        if(error){
            callback('Unable to connect to the network', undefined)
    }
        else if( body.error){
            callback('Unable to find location', undefined)
    }else{
        callback(undefined, 
             body.current.weather_descriptions[0] + '. It us currently ' + body.current.temperature + ' degress out. These is a ' + body.current.feelslike +'% chance of rain. ' 
        );
    }
   
    })
}

module.exports = foreCast;