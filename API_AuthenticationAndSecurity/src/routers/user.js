const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// /////////
// Create //
// /////////
router.post( '/users', async ( req, resp) => {
    const user = new User( req.body );
    // console.log(user);
    try{
        await user.save()
        // generating and saving token
        const token = await user.generateAuthToken();
        resp.status( 201 ).send( { user, token } );
    }catch(e){
        resp.status( 400 ).send( e );
    }

    // user.save()
    //     .then( () => {
    //         resp.status( 201 ).send( user );
    //     }).catch( (error) => {
    //         resp.status( 400 ).send( error );
    // })
});

// loggin
router.post('/users/login', async (req, resp) => {
    try{
        const user = await User.findByCredentials(
            req.body.email, req.body.password
        )
        const token = await user.generateAuthToken();
        resp.send( { user , token } );
    } catch(e){
        resp.status(400).send(e);
    }
})
// router.post('/users/login', async (req, resp) => {
//     try{
//         const user = await User.findByCredentials(
//             req.body.email, req.body.password
//         )
//         const token = await user.generateAuthToken();
//         resp.send( { user: user.getPublicProfile(), token } );
//     } catch(e){
//         resp.status(400).send(e);
//     }
// })

// logout
router.post('/users/logout', auth, async(req, resp) =>{ 
    try{
        req.user.tokens = req.user.tokens.filter( ( token) => {
            // token that matches will be removed from the list
            return token.token !== req.token
        })
        await req.user.save();

        resp.send();
    }catch (e){
        resp.status(500).send();
    }
})

// logoutAll
router.post('/users/logoutAll', auth, async(req, resp) =>{ 
    try{
    
        req.user.tokens = [];
        await req.user.save();

        resp.send();
    }catch (e){
        resp.status(500).send();
    }
})

// Read
// router.get( '/users', auth, async (req, resp) => {
//     try{
//         const users = await User.find({})
//         resp.send( users );

//     }catch(e){
//         resp.status(500).send()
//     }
//     // // empty object as we want to select evey thing
//     // User.find( { } ).then( (users) => {
//     //     resp.send(users);
//     // }).catch( (e) => {
//     //     resp.status(500).send();
//     // })
// });
router.get( '/users/me', auth, async (req, resp) => {
    resp.send(req.user);
});

// router.get( '/users/:id', async (req, resp) => {
//     const _id = req.params.id;

//     try{
//         const user = await User.findById( _id );

//         if( !user ){
//             return resp.status(404).send();
//         }
//         resp.send(user);

//     } catch (e){
//         resp.status(500).send();
//     }

//     // User.findById( _id ).then( (user) => {
//     //     if( !user ){
//     //         return resp.status(404).send();
//     //     }
//     //     resp.send(user);
//     // })
//     // // a mongo db query is not a failure if it does't fetch anything
//     // .catch( (e) => {
//     //     resp.status(500).send();
//     // })

// });

//delete
router.delete( '/users/me', auth, async( req, resp) => {
    try{
        await req.user.remove();
        resp.send(req.user);

    }catch(e){
        resp.status(500).send()
    }
});
// router.delete( '/users/:id', async( req, resp) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)

//         if(!user){
//             return resp.status(404).send();
//         }
//         resp.send(user);

//     }catch(e){
//         resp.status(500).send()
//     }
// });

// update
router.patch('/users/me', auth, async ( req, resp ) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) );

    if(!isValidOperation){
        return resp.status(400).send({ error: 'Invalid updates!' });
    }
    try{
        // console.log("++++++++++++")
        // console.log("REQ", req)
        updates.forEach(( update ) =>  req.user[update] = req.body[update] );

        await req.user.save(); 

        resp.send(req.user);

    } catch (e){
        resp.status(400).send(e);
    }
})
// // update
// router.patch('/users/:id', async ( req, resp ) => {
//     const updates = Object.keys(req.body);
//     // console.log(req.body);
    
//     const allowedUpdates = ['name', 'email', 'password', 'age'];
//     const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) );

//     if(!isValidOperation){
//         return resp.status(400).send({ error: 'Invalid updates!' });
//     }
//     try{
//         // const user = await User.findByIdAndUpdate( req.params.id, req.body, {
//         //     new: true,
//         //     runValidators: true,
//         // })

//         // the above code findByIdAndUpdate bypasses mongoose, it perform direct operation on the data base, that was the reason we need to set a special option for running the validator. so we will be writing code which is more traditionl mongoose way.

//         const user = await User.findById(req.params.id);

//         updates.forEach(( update ) =>  user[update] = req.body[update] );

//         await user.save(); 

//         if( !user ){
//             return resp.status( 404 ).send();
//         }
//         resp.send(user);

//     } catch (e){
//         resp.status(400).send(e);
//     }
// })

module.exports = router;