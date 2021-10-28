// const mongodb = require('mongodb'); 
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// destructing above code 
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dataBaseName = 'task-manager';

// const id = new ObjectID(); 
// object is a constructor function | new keyword is optional -> mongodb will take care of it for you
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser:true }, (error, client) => {
    if( error ){
        return console.log('Unable to connect to the database!')
    }

    const db = client.db(dataBaseName);

    db.collection('users').deleteOne( { 
        age: 5
    }).then( (result) => {
        // console.log(result);
    }).catch( ( err ) =>{
        console.group(err);
    })
});