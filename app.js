const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();


app.use(cors({
    origin: '*',
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/init', (req, res) => {
    res.send('ok')
})

// parse application/json
app.use(bodyParser.json())

app.listen(4000, () => {
    console.log('Server started on port 4000');
    mongoose.set("strictQuery", false);
    mongoose.connect('mongodb://127.0.0.1:27017/test11').then(() => console.log('Connected!'));
});