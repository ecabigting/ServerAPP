const express = require('express') // require package express js
const path = require('path') // require the package path from nodejs
const fileUpload = require('express-fileupload') // adds the files property to the req object so that we can access the uploaded files using req.files.

const mongoose = require('mongoose') // require the mongoose package
mongoose.connect('mongodb://localhost/efnMongoDB',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true }) // connect to MongoDB on local using mongoose

const app = new express() // declare `app` as a new instance of express js

/* we need the body-parsing middleware called body-parser,
 body-parser parse incoming request bodies
 it will make the form data available under the req.body property
 */
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 
app.use(express.static('public')) // serve public folder for our static files
app.use(fileUpload()) // register the fileupload package in Express
app.set('view engine','ejs') // require ejs templating language

app.listen(1204, ()=>{ console.log('>> App listening on port 1204') }) // start the app and listen to port 1204

/****************/
/** MODEL INIT **/
const BlogPost = require('./models/BlogPost.js') // lets import the BlogPost Model

/***********************/
/** PUBLIC GET ROUTES **/
app.get('/about',(req,res) => { // declare a route to about page
    res.render('about')
})

app.get('/contact',(req,res) => { // declare a route to contact page
    res.render('contact')
})

app.get('/post/new',(req,res) => { // declare a route to create new blog post
    res.render('create')
})

app.get('/post/:id',async (req,res) => { // declare a route to blog posts page
    const foundPost = await BlogPost.findById(req.params.id) // find the blogpost via id
    res.render('post',{foundPost})
})

app.get('/', async (req,res) => { // declare a route to home(index) or root
    const blogposts = await BlogPost.find({}) // lets retrieve all blog post and hold them in blogposts varliable
    /* calling responds to render 'index'
     we pass back the blogposts data back to
     the browser by providing it as the second argument to 'render'
     */
    res.render('index',{ 
        blogposts // NOTE: if keyname and value name are the same use 'blogpost' instead of 'blogpost:blogpost'
    })
})

/************************/
/** PUBLIC POST ROUTES **/

/* a route to recieved POST request for creating post
   we specify async as the following method is an asynchronous call
   and using await for BlogPost.create, we are saying that we will await
   the completion of the current line before the below line can be executed 
*/
app.post('/posts/store', (req,res) => {
    /* create a shortcut to req.files.image
    the req.files.image object contains properties such as mv
    mv - is a function to move the file elsewhere on your server name
    see complete list of properties of express-fileupload
    https://www.npmjs.com/package/express-fileupload
    */ 
    let image = req.files.image
    //lets create a unique image name first
    let imgName = new Date().getTime() + "_" + image.name.replace(/\W/g,'') + "." + image.name.split('.')[1]
    console.log(imgName)
    /* the code below image.mv moves the uploaded file to public/img directory
       and name it using the image.name property
       once this is done, we create the post
     */
    image.mv(path.resolve(__dirname,'public/img',imgName),
            /*note the async statement, 
              we only use async in the scope where we use await
             */
            async (error) => {
                // lets log the error just in case
                console.log(error)
                /* the model will create
                a new doc with the browser data sent
                the first arg recieves the req.body
                and callback function as the second arg
                which is called after execution
                */
                await BlogPost.create(
                    {
                        ...req.body,
                        image:'/img/' + imgName
                    }
                )
                res.redirect('/')
            }
    )
})

// a route to recieved POST request for searching
app.post('/posts/search',async (req,res) => { 
    console.log("Search for term: " + req.body.search)
    const blogposts = await BlogPost.find(
            {$text : {$search: req.body.search}},
            {score: {$meta: "textScore"}}
        )
    res.render('index',{ blogposts })
})


// pg76