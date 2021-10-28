const express = require('express');
const Task = require('../models/task');
const router = new express.Router();


// ///////
// Task //
// ///////
router.post( '/tasks', async ( req, resp) => {
    const task = new Task( req.body );

    try{
        await task.save();
        resp.status( 201 ).send( task );

    }catch(e){
        resp.status( 400 ).send( error );
    }

    // task.save()
    //     .then( () => {
    //         resp.status( 201 ).send( task );
    //     }).catch( (error) => {
    //         resp.status( 400 ).send( error );
    // })
});

// Read 
router.get( '/tasks', async ( req, resp) =>{

    try{
        const task = await Task.find( { } );
        resp.send(task);
    }catch(e) {
        resp.status(500).send();
    }

    // Task.find( { } ).then( (task) => {
    //     resp.send(task);
    // }).catch( (e) => {
    //     resp.status(500).send();
    // })
});

router.get( '/tasks/:id', async ( req, resp) =>{
    const _id = req.params.id;
    
    try{
        const task = await Task.findById( _id )
        if( !task ){
            return resp.status(404).send();
        }
        resp.send(task);
    }catch(e){
        resp.status(500).send();
    }

    // Task.findById( _id ).then( (task) => {
    //     if( !task ){
    //         return resp.status(404).send();
    //     }
    //     resp.send(task);
    // })
    // // a mongo db query is not a failure if it does't fetch anything
    // .catch( (e) => {
    //     resp.status(500).send();
    // })
})

router.delete( '/tasks/:id', async( req, resp) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return resp.status(404).send();
        }
        resp.send(task);

    }catch(e){
        resp.status(500).send()
    }
});

// update
router.patch('/tasks/:id', async( req, resp ) => {
    const updates = Object.keys( req.body );
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if( !isValidOperation){
        return resp.status(404).send( {error: 'Invalid updates!'} );
    }

    try{
        const task =  await Task.findByIdAndUpdate( req.params.id, req.body, {
            new: true, runValidators: true
        })
        if( !task ){
            return resp.status(404).send();
        }
        resp.send(task);

    }catch(e){
        resp.status(400).send(e)
    }
})

module.exports = router;