// code example done from page 29

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('public'))

// start the app
app.listen(1204,()=>{
    console.log("App Listening on porn 1204")
})

// home
app.get('/',function getResponse(req,res){
    console.log(__dirname)
    res.sendFile(path.resolve(__dirname,'index.html')) 
})

// about
app.get('/about',function getResponse(req,res){
    console.log(__dirname)
    res.sendFile(path.resolve(__dirname,'about.html')) 
})

// contact
app.get('/contact',function getResponse(req,res){
    console.log(__dirname)
    res.sendFile(path.resolve(__dirname,'contact.html')) 
})