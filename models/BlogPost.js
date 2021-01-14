const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    createdBy : Number,
    createdDate : { type: Date, default: new Date() },
    lastEditedBy : { type: Date, default: new Date() },
    lastEditedDate : { type: Date, default: new Date() },
    image: String
});


BlogPostSchema.index({title:"text",body:"text"})
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost
