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
    try {
        const result = await dbClient.fetchProfileAndAllData(req.params.id)
        return res.status(200).json(result.data)
    } catch (error){ 
        return res.status(500).json({error: "Internal server error"})
    }
})

app.post('/:id', async (req, res) => {
    try {
        const result = await dbClient.uploadNewHabit(req.params.id, req.body.habitName);
        return res.status(result.status).json(result.data || result.error);
    } catch (error) {
        console.error("Error inserting new habit", error)
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.post('/:id/log-habit', async (req, res) => {
    try {
        const body = req.body
        const userId = req.params.id;
        const habitName = body.habitName;
        const completed_at = body.dateCompleted;

        const habit = await dbClient.findHabitIdByName(userId, habitName);

        if (!habit) {
            return res.status(404).json({ error: "Habit not found for this user." });
        }
        //Todo: handle for if there are multiple habits with the same name
        const result = await dbClient.logHabitCompletion(habit.id, completed_at)

        return res.status(200).json(result.data);
    } catch (err) {
        res.status(500).json({ error: err.message || "Internal server error" });
    }
});



//Listen for Requests
app.listen(port, () => {
    return console.log(`Listening on port ${port}`)
})