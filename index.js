const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const reader = require('xlsx');

const app = express();
const Category = require('./models/Category');
const Post = require('./models/Post');

const { readFile, writeFileCSV } = require('./services/post.service');

app.use(cors({
    origin: '*',
}));

app.get('/test', async (req, res) => {
    try {

        const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
    // const category = new Category();
    // console.log(category);
    // category.title = 'abc1';
    // category.note = 'test1';
    // const cate = await category.save();
    // const list = await Category.find();
    // console.log(list);
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

app.listen(3000, () => {
    console.log('Server started on port 3000');
    mongoose.set("strictQuery", false);
    mongoose.connect('mongodb://127.0.0.1:27017/test11').then(() => console.log('Connected!'));
});