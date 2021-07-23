// const geoCode = require('./utils/geocode') ;
// const foreCast = require('./utils/forecast');

// const address = process.argv[2];

// if(!address){
//     console.log('Please provide an address')
// }else{
//     geoCode( address, (error, {latitude, longitude, location} = {} ) => {
//         if(error){
//             return console.log(error);
//         }
    
//         foreCast( latitude, longitude, (error, foreaCastData) => {
//             if(error){
//                 return console.log(error);
//             }
//             console.log( location );
//             console.log(foreaCastData);
//         })
//     })
// };

const express = require('express');
const app = express();

// http://localhost:3000
app.get('', (req, resp) => {
    resp.send('Hello express');
});

// http://localhost:3000/help
app.get('/help', (req, resp) => {
    resp.send('Help page');
});

app.get( '/about', (req, resp) =>{
    resp.send('Your are on about page')
})

app.get('/weather', (req, resp) => {
    resp.send('you are on weather page')
})

app.listen( 3000, () =>{
    console.log('Server Started')
});
