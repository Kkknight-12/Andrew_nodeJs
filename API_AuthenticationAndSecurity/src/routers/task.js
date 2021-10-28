const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth')
const router = new express.Router();


// ///////
// Task //
// ///////
router.post( '/tasks', auth,  async ( req, resp) => {
    const task = new Task( { ...req.body, owner: req.user._id } );

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
router.get( '/tasks', auth, async ( req, resp) =>{

    try{
        // const task = await Task.find( { } );

        // const tasks = await Task.find( { owner: req.user._id } )
        // resp.send(tasks);
        // or
        await req.user.populate( 'tasks' ).execPopulate();
        resp.send( req.user.tasks );
    }catch(e) {
        resp.status(500).send();
    }

    // Task.find( { } ).then( (task) => {
    //     resp.send(task);
    // }).catch( (e) => {
    //     resp.status(500).send();
    // })
});

router.get( '/tasks/:id', auth, async ( req, resp) =>{
    const _id = req.params.id;
    
    try{
        // const task = await Task.findById( _id );
        const task = await Task.findOne( { _id, owner: req.user._id } )

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

router.delete( '/tasks/:id', auth, async( req, resp) => {
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete( { _id: req.params.id, owner: req.user._id } )

        if(!task){
            return resp.status(404).send();
        }
        resp.send(task);

    }catch(e){
        resp.status(500).send()
    }
});

// update
router.patch('/tasks/:id', auth, async( req, resp ) => {
    const updates = Object.keys( req.body );
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if( !isValidOperation){
        return resp.status(404).send( {error: 'Invalid updates!'} );
    }

    try{
        // const task =  await Task.findByIdAndUpdate( req.params.id, req.body, {
        //     new: true, runValidators: true
        // })

        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne( { _id: req.params.id, owner: req.user._id } );

        if( !task ){
            return resp.status(404).send();
        }
        updates.forEach( ( update )=> task[update] = req.body[update] );
        await task.save();
        resp.send(task);

    }catch(e){
        resp.status(400).send(e)
    }
})

module.exports = router;