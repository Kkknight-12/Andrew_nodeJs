const geoCode = require('./utils/geocode') ;
const foreCast = require('./utils/forecast');

const address = process.argv[2];

if(!address){
    console.log('Please provide an address')
}else{
    geoCode( address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return console.log(error);
        }
    
        foreCast( latitude, longitude, (error, foreaCastData) => {
            if(error){
                return console.log(error);
            }
            console.log( location );
            console.log(foreaCastData);
        })
    })
};





// const url = 'http://api.weatherstack.com/current?access_key=dbb804baf9663ae7581848f1c06d5652&query=37.8267,-122.4233&units=f';

// request( {url: url, json:true}, (error, resp ) => {
//     // const data = JSON.parse(resp.body);
//     if(error){
//         console.log('Unable to connect to the network')
//     }
//         else if(resp.body.error){
//             console.log('Unable to find location')
//     }else{
//             console.log(resp.body.current.weather_descriptions[0]);
//             console.log(resp.body.current.temperature);
//             console.log(resp.body.current.feelslike);
//     }
// } );

// const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia25pZ2h0LTEyIiwiYSI6ImNrcmJ0eDJsNDF2MXEycWxwazBiOXQydncifQ.UQJPcPshVuYkTcoeZikjjA"

// request( {url: geoCodeUrl, json:true}, (error, resp ) => {
//     // const data = JSON.parse(resp.body);
//     if(error){
//         console.log('Unable to connect to the network')
//     }
//     else if(resp.body.features.length === 0){
//         console.log('Unable to find location. Try another search');
//     }else{
//         const longitude = resp.body.features[0].center[0];
//         const latitude = resp.body.features[0].center[1];
//         console.log(latitude, longitude)
//     }
// } );
