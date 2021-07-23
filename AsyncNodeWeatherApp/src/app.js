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
