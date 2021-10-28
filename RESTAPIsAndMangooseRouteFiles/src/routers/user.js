const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// /////////
// Create //
// /////////
router.post( '/users', async ( req, resp) => {
    const user = new User( req.body );
    console.log(user);
    try{
        await user.save()
        resp.status( 201 ).send( user );
    }catch{
        resp.status( 400 ).send( error );
    }

    // user.save()
    //     .then( () => {
    //         resp.status( 201 ).send( user );
    //     }).catch( (error) => {
    //         resp.status( 400 ).send( error );
    // })
});

// Read
router.get( '/users', async (req, resp) => {


    try{
        const users = await User.find({})
        resp.send( users)

    }catch(e){
        resp.status(500).send()

    }
    // // empty object as we want to select evey thing
    // User.find( { } ).then( (users) => {
    //     resp.send(users);
    // }).catch( (e) => {
    //     resp.status(500).send();
    // })
});

router.get( '/users/:id', async (req, resp) => {
    const _id = req.params.id;

    try{
        const user = await User.findById( _id );

        if( !user ){
            return resp.status(404).send();
        }
        resp.send(user);

    } catch (e){
        resp.status(500).send();
    }

    // User.findById( _id ).then( (user) => {
    //     if( !user ){
    //         return resp.status(404).send();
    //     }
    //     resp.send(user);
    // })
    // // a mongo db query is not a failure if it does't fetch anything
    // .catch( (e) => {
    //     resp.status(500).send();
    // })

});

//delete
router.delete( '/users/:id', async( req, resp) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return resp.status(404).send();
        }
        resp.send(user);

    }catch(e){
        resp.status(500).send()
    }
});

// update
router.patch('/users/:id', async ( req, resp ) => {
    const updates = Object.keys(req.body);
    console.log(req.body);
    
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) );

    if(!isValidOperation){
        return resp.status(400).send({ error: 'Invalid updates!' });
    }
    try{
        const user = await User.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if( !user ){
            return resp.status( 404 ).send();
        }
        resp.send(user);

    } catch (e){
        resp.status(400).send(e);
    }
})

module.exports = router;