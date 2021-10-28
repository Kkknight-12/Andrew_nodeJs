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

const path = require('path');
const express = require('express');
const { dirname } = require('path');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join( __dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to server
app.use(express.static(publicDir));

app.get( '', (req, resp) => {
    resp.render('index', {
        title:'weather app',
        name: 'Knight'
    })
})

app.get( '/about', (req, resp) =>{
    resp.render('about', {
        name:'Knight',
        title: 'About me'
    })
})

// http://localhost:3000/help
app.get('/help', (req, resp) => {
    resp.render('help',{
            helpText: 'Some helpful text',
            name:'Knight',
            title: 'About me'
    });
});


// app.get('/weather', (req, resp) => {
//     if(!req.query.address){
//         return resp.send({
//             error: 'you must provide an address'
//         })
//     }
//    resp.send({
//             forcast: 'Its raining',
//             location: 'Dharamshala',
//             address: req.query.address
//         })
// })

// app.get( '/products', (req, resp) => {
//     if(!req.query.search){
//         return resp.send({
//             error: 'asdasdasdasdasdada'
//         })
//     }
//     console.log( req.query.search)
//     resp.send({
//         product:[]
//     })
// })

// setting up 404
//  * means everthing that doest not listed above
app.get( '/help/*', (req, resp)=>{
    resp.render('404', {
        errorMessage:'yha koi help nhi milegi',
        name:'Knight',
        title: '404 page'

    } )
} )
app.get( '*', (req, resp)=>{
    resp.render('404', {
        errorMessage:'Maf kerna maf kerna',
        name:'Knight',
        title: '404 page'
    } )
} )


app.listen( 3000, () =>{
    console.log('Server Started')
});
