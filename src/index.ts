import express from 'express';
import authorizeRequest from './middleware/auth';
import { supabaseDB } from './db';

const app = express()
const port = process.env.PORT || 4000

const dbClient = new supabaseDB(process.env.DATABASE_URL, process.env.DATABASE_PASSWORD)

app.get('/health', (req,res)=>{
    res.statusCode = 200
    res.send('healthy')
})

//Register Middleware
app.use(authorizeRequest)

//Register Endpoints
app.get('/:id', async (req, res) => {

    const { data, error } = await dbClient.fetchProfileAndAllData(req.params.id)
    if (error) {
        console.error("Error fetching data", error)
        res.send("Error")
    }
    res.send(
        {data}
    )
})

//Listen for Requests
app.listen(port, () => {
    return console.log(`Listening on port ${port}`)
})