const express = require('express');
require('./db/mongoose')// conecting to mongoose
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./Routes/user')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // customising Express to Automatically parse incoming JSON for us
/* it will automatically parse all the incoming JSON object so that we can that we can access that in our request handlers */

app.use(userRouter);

// /////////
// Create //
// /////////
app.post( '/users', async ( req, resp) => {
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
app.get( '/users', async (req, resp) => {


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

app.get( '/users/:id', async (req, resp) => {
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
app.delete( '/users/:id', async( req, resp) => {
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
app.patch('/users/:id', async ( req, resp ) => {
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

// ///////
// Task //
// ///////

app.post( '/tasks', async ( req, resp) => {
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
app.get( '/tasks', async ( req, resp) =>{

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

app.get( '/tasks/:id', async ( req, resp) =>{
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

app.delete( '/tasks/:id', async( req, resp) => {
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
app.patch('/tasks/:id', async( req, resp ) => {
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

app.listen( port, () =>{
    console.log('Server is up on port ' + port);
});