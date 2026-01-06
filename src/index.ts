import express from 'express'
console.log("hi")
const app = express()

app.get('/', (req, res)=>{
    res.send("hello world");
})
app.listen(3000, ()=>{
    return console.log("Listening on port 3000")
})