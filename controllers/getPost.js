const BlogPost = require('../models/BlogPost.js')

module.exports = async(req,res)=>{
    const foundPost = await BlogPost.findById(req.params.id)
    console.log(foundPost)
    res.render('post',{foundPost})
}