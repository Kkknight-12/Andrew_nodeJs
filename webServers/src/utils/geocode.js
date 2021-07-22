const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia25pZ2h0LTEyIiwiYSI6ImNrcmJ0eDJsNDF2MXEycWxwazBiOXQydncifQ.UQJPcPshVuYkTcoeZikjjA";

    request({ url: url, json: true}, (error, {body}) => {
        // console.log(resp.body)
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined);
        }else{
            callback( undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            } )
        }
    })
}

// geoCode( 'Dharamshala', (error, data) => {
//     console.log('Error', error);
//     console.log('Data', data);
// });

module.exports = geoCode;

