const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const reader = require('xlsx');
const bodyParser = require('body-parser')

const app = express();
const Category = require('./models/Category');
const Post = require('./models/Post');

const { readFile, writeFileCSV, readFileTxt, savePost, writeFileTxt } = require('./services/post.service');

app.use(cors({
    origin: '*',
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/test', async (req, res) => {
    try {

        const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
    res.send('hello');
});

app.get('/test-csv', async (req, res) => {
    try {

        await readFile();

        res.status(200).json({});
    } catch (error) {
        console.log(error);
    }
});

app.get('/write-file', async (req, res) => {
    try {
        await writeFileCSV();

        res.status(200).json({});
    } catch (error) {
        console.log(error);
    }
});

app.get('/read-file-txt', async (req, res) => {
    try {
        const result = await readFileTxt();
        console.log(result);
        res.send('ok')
    } catch (error) {
        console.log(error);
    }
});

app.get('/write-file-txt', async (req, res) => {
    try {
        await writeFileTxt();
        res.send('ok')
    } catch (error) {
        console.log(error);
    }
});

app.post('/test-post', async (req, res) => {
    try {
        const data  = req.body;
        await savePost();
        res.status(200).json({
            data: [],
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
    mongoose.set("strictQuery", false);
    mongoose.connect('mongodb://127.0.0.1:27017/test11').then(() => console.log('Connected!'));
});