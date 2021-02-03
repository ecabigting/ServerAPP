const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async (req,res) => {
    console.log("Search for term: " + req.body.search)
    const blogposts = await BlogPost.find(
            {$text : {$search: req.body.search}},
            {score: {$meta: "textScore"}}
        )
    res.render('index',{ blogposts })
}