const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true, // 
    useCreateIndex: true, // when mangoose work with mongodb,index will be created allowing us to quickly access the data we need to access
});

// const User = mongoose.model( 'User', {
//     name: {
//         type: String,
//         trim: true, // will remove the extra space provided while creating field
//         required: true // now providing name while creating field is mandatory
//     },
//     email: {
//         type: String,
//         trim: true,
//         required: true,
//         lowercase: true,
//         validate(value){
//             if( !validator.isEmail(value)){
//                 throw new Error('Email is invalid');
//             }
//         }
//     },
//     password:{
//         type: String,
//         trim:true,
//         required: true,
//         minlength:7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){ // passowrd cant be set if it contain passowrd
//                 throw new Error('Password cannot be "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value){ // creating custom validator
//             if(value < 0 ){
//                 throw new Error('Age must be a positive number');
//             }
//         }
//     }
// });

// const me = new User({
//     name: '    Mikelengelo  ', 
//     email:'Mikey@GMAIL.COM', // validator will run on email we enter while creating fields
//     // age: 17,
//     password: 'chaloChatlehai123', 

// });

// me.save()
//     .then(() => {
//         console.log("Done!" + me);
//     })
//     .catch( (err) =>{
//         console.log(err);
// })

// const Task = mongoose.model( 'Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     }
// });

// const task  = new Task( {
//     description: 'Learn mongoose libaray',

// });

// task.save()
//     .then( () => {
//         console.log(task);
//     })
//     .catch( (error) => {
//         console.log(error);
// });