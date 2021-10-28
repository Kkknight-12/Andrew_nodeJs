const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, resp, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify( token, 'learningNode');
        // console.log("decoded._id", decoded);
        // decoded._id { _id: '61528665e6c8502d3583c9b1', iat: 1633010405 }
        const user = await User.findOne( {_id: decoded._id, 'tokens.token':token});
        
        // console.log(token)
        // console.log(decoded);

        if( !user ){
            throw new Error();
        }

        req.token = token;
        req.user = user;
        console.log(req);
        
        next();

    }catch(e){
        resp.status(401).send({error: 'please authenticate'})
    }
}

module.exports = auth;