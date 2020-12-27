// require package express js
const express = require('express')

// require the package path from nodejs
const path = require('path')

// require the mongoose package
const mongoose = require('mongoose')

// connect to mongoose on local
mongoose.connect('mongodb://localhost/my_database',
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
// declare `app` as a new instance of express js
const app = new express()

// require ejs templating language
app.set('view engine','ejs')

// serve public folder for our static files
app.use(express.static('public'))

// start the app and listen to port 1204
app.listen(1204, ()=>{
    console.log('App listening on port 1204')
})

// we need the body-parsing middleware called body-parser
// body-parser parse incoming request bodies
// it will make the form data available under the req.body property
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// lets import the BlogPost Model
const BlogPost = require('./models/BlogPost.js')

// declare a route to home(index) or root
// app.get('/', async (req,res)=>{
//     // lets retrieve all blog post and hold them in blogposts varliable
//     const blogposts = await BlogPost.find({})
//     // calling responds to render 'index'
//     // we pass back the blogposts data back to
//     // the browser by providing it as the second argument to 'render'
//     res.render('index',{
//         // if keyname and value name are the same we can use the same
//         // so use 'blogpost' instead of 'blogpost:blogpost'
//         blogposts
//     })
// })

app.get('/',async (req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{blogposts});
})
    

// declare a route to about page
app.get('/about',(req,res) => {
    res.render('about')
})

// declare a route to contact page
app.get('/contact',(req,res) => {
    res.render('contact')
})

// declare a route to blog posts page
app.get('/post',(req,res) => {
    res.render('post')
})

// declare a route to create new blog post
app.get('/post/new',(req,res) => {
    res.render('create')
})

// declare a route to to recieved POST request
// we specify async as the following method is an asynchronous call
// and using await for BlogPost.create, we are saying that we will await
// the completion of the current line before the below line can be executed
app.post('/posts/store',async (req,res) => {
    // the model will create
    // a new doc with the browser data sent
    // the first arg recieves the req.body
    // and callback function as the second arg
    // which is called after execution
    await BlogPost.create(req.body)
    res.redirect('/')
})
