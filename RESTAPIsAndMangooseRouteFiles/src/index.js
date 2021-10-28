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