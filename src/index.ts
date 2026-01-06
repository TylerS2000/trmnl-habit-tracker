import express from 'express'
console.log("hi")
const app = express()
const port = process.env.PORT || 4000 

app.get('/', (req, res)=>{
    res.send("hello world");
})
app.listen(port, ()=>{
    return console.log("Listening on port 3000")
})