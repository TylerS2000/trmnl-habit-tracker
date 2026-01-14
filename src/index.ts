import express from 'express';
import authorizeRequest from './middleware/auth';
import { supabaseDB } from './db';

const app = express()
const port = process.env.PORT || 4000

const dbClient = new supabaseDB(process.env.DATABASE_URL, process.env.DATABASE_PASSWORD)

app.get('/health', (req, res) => {
    res.statusCode = 200
    res.send('healthy')
})

//Register Middleware
app.use(authorizeRequest)

app.use(express.json());


//Register Endpoints
app.get('/:id', async (req, res) => {

    const { data, error } = await dbClient.fetchProfileAndAllData(req.params.id)
    if (error) {
        console.error("Error fetching data", error)
        res.send("Error")
    }
    res.send(
        { data }
    )
})

app.post('/:id', async (req, res) => {

    const { data, error } = await dbClient.uploadNewHabit(req.params.id, req.body.habitName)
    if (error) {
        console.error("Error inserting new habit", error)
        res.send("Error")
    }
    res.send(
        { data }
    )
})

app.post('/:id/log-habit', async (req, res) => {
    try {
        const userId = req.params.id;
        const habitName = req.body.habitName;

        const habit = await dbClient.findHabitIdByName(userId, habitName);

        if (!habit) {
            return res.status(404).json({ error: "Habit not found for this user." });
        }

        const {success, error} = await dbClient.logHabitCompletion(habit[0].id)
        
        if(error){
            throw error
        }

        res.send(200);



    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//Listen for Requests
app.listen(port, () => {
    return console.log(`Listening on port ${port}`)
})