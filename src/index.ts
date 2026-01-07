import express from 'express';
import authorizeRequest from './middleware/auth';

const app = express()
const port = process.env.PORT || 4000 

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