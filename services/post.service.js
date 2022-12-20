const reader = require('xlsx');
const Post = require('../models/Post');

exports.readFile = async () => {
    const file = reader.readFile('./test1.csv');

    const sheets = file.SheetNames;

    let data = []
    const temp = reader.utils.sheet_to_json(file.Sheets['Sheet1']);

    if (!temp || temp.length === 0) return;

    let post;
    let promises = [];
    for (const p of temp) {
        post = new Post();
        post.sample = p.samples;
        post.intent = p.Intent;
        post.entity = p.Entity;

        promises.push(post.save());

        if (promises.length === 1000) {
            await Promise.all(promises);
            promises = [];
        }
    }

    if (promises.length === 0) return;

    return Promise.all(promises);
};

exports.writeFileCSV = () => {
    const json = [
        {
            id: 1,
            color: 'red',
            number: 75
        },
        {
            id: 2,
            color: 'blue',
            number: 62
        },
        {
            id: 3,
            color: 'yellow',
            number: 93
        },
        {
            id: 4,
            color: 'yellow',
            number: 93
        },
        {
            id: 5,
            color: 'yellow',
            number: 93
        },
    ];

    let workBook = reader.utils.book_new();
    const workSheet = reader.utils.json_to_sheet(json);
    reader.utils.book_append_sheet(workBook, workSheet, `test2`);
    let exportFileName = `test2.csv`
    return reader.writeFile(workBook, exportFileName);
};