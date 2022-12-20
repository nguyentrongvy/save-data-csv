const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    sample: String,
    entity: String,
    intent: String,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;