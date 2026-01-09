import express from 'express';
import authorizeRequest from './middleware/auth';
import initDbConnectionAndGrabData from './db';

const app = express()
const port = process.env.PORT || 4000 

initDbConnectionAndGrabData().then((data)=>{console.log(data)});

//Register Middleware
app.use(authorizeRequest)

//Register Endpoints
app.get('/', (req, res)=>{
    res.send("hello world");
})

//Listen for Requests
app.listen(port, ()=>{
    return console.log(`Listening on port ${port}`)
})