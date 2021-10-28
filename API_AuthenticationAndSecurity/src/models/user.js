const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// separating the schema and model

// passing schema object to mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // will remove the extra space provided while creating field
        required: true // now providing name while creating field is mandatory
    },
    email: {
        type: String,
        unique:true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//
userSchema.methods.generateAuthToken = async function( ) {
    const user = this;
    // console.log("this and id", this, user._id);

    const token = jwt.sign( { _id: user._id.toString() }, 'learningNode');
    user.tokens = user.tokens.concat( { token: token } );
    await user.save();

    return token;
}

//
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    console.log('userObject', userObject);
    delete userObject.password;
    delete userObject.tokens;
    
    return userObject;
}

//
userSchema.statics.findByCredentials = async(email, password) =>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user
}   

// userSchema.pre for doing something before the event has occured
// and userSchema.post for after the event has occured
userSchema.pre('save', async function(next){
    const user = this;

    // will be true when the user is created/updated ( password)
    if( user.isModified('password')){
        user.password = await bcrypt.hash( user.password, 8);
    }

    next();

})

// Delete user tasks when user is removed
userSchema.pre( 'remove',  async function (next) {
    const user = this;
    await Task.deleteMany( { owner: user._id });
    next();
})

const User = mongoose.model( 'User', userSchema );

module.exports = User;