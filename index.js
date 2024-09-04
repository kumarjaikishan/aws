const express = require('express');
const app = express();
const { addJobToQueue } = require('./producer');
require('./worker')
const port = process.env.PORT || 5001;
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send("This is AWS Backend, Created by Jai kishan")
})
app.post('/producer', async (req, res) => {
    try {
        await addJobToQueue(req.body.email, req.body.title, req.body.body)
        return res.status(200).json({
            message: "Email sent"
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
})
app.listen(port, () => {
    console.log(`server listening at ${port}`);
})