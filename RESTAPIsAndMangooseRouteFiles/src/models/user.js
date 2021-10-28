const { model } = require('mongoose');
const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model( 'User', {
    name: {
        type: String,
        trim: true, // will remove the extra space provided while creating field
        required: true // now providing name while creating field is mandatory
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value){
            if( !validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        type: String,
        trim:true,
        required: true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){ // passowrd cant be set if it contain passowrd
                throw new Error('Password cannot be "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){ // creating custom validator
            if(value < 0 ){
                throw new Error('Age must be a positive number');
            }
        }
    }
});

module.exports = User;