import express from 'express';
import authorizeRequest from './middleware/auth';
import { supabaseDB } from './db';

const app = express()
const port = process.env.PORT || 4000

const dbClient = new supabaseDB(process.env.DATABASE_URL, process.env.DATABASE_PASSWORD)

//Register Middleware
app.use(authorizeRequest)

//Register Endpoints
app.get('/:id', (req, res) => {
    let data
    try {
        const dbResponse = dbClient.grabHabitDataById(req.params.id).then((response => { data = response.data }))
        console.log(dbResponse)
    } catch (e) {
        throw e
    }

    res.send(
        data
    )
})

//Listen for Requests
app.listen(port, () => {
    return console.log(`Listening on port ${port}`)
})