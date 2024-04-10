const express = require('express');
const app = express();
require('./worker')
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send("This is AWS Backend, Created by Jai kishan")
})
app.get('/add', (req, res) => {
    res.status(200).send("This is Add Route, Created by Jai kishan")
})
app.listen(port, () => {
    console.log(`server listening at ${port}`);
})