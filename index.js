// require package express js
const express = require('express')

// require the package path from nodejs
const path = require('path')

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

// declare a route to home(index) or root
app.get('/', (req,res)=> {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

// declare a route to about page
app.get('/about',(req,res) => {
    res.sendFile(path.resolve(__dirname,'pages/about.html'))
})

// declare a route to contact page
app.get('/contact',(req,res) => {
    res.sendFile(path.resolve(__dirname,'pages/contact.html'))
})

// declare a rout to post page
app.get('/post',(req,res) => {
    res.sendFile(path.resolve(__dirname,'pages/post.html'))
})