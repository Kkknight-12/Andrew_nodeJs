const express = require('express');
require('./db/mongoose')// conecting to mongoose
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // customising Express to Automatically parse incoming JSON for us
/* it will automatically parse all the incoming JSON object so that we can that we can access that in our request handlers */

app.use(userRouter);
app.use(taskRouter);

app.listen( port, () =>{
    console.log('Server is up on port ' + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async () =>{
//     const password = 'aabcdef'
//     const hasedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hasedPassword)
// };

// myFunction();

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign( { _id: 'abc123'}, 'learningnode' , { expiresIn: '7 days' } );

//     const data = jwt.verify(token, 'learningnode');

//     console.log(data);
// }
// myFunction();

const User = require('./models/user');
const main = async() => {

    const user = await User.findById('61569c49f179c5303b8ac7de');
    await user.populate('tasks').execPopulate();
    console.log("__ __", user.tasks);
} 
main();

// const Task = require('./models/task');

// const main = async() => {

//     const task = await Task.findById('61569c5cf179c5303b8ac7e1');
//     await task.populate('owner').execPopulate();
//     console.log("____",task);
// }
// main()