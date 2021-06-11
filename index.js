const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('public'))

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology:true})
    




       
 .then(client=>{
     console.log('Connected to database');
     const db = client.db("PhotoDB")
     const title = db.collection('Photos')
     app.set('view engine','ejs')
     app.listen(4000,function(req,res){
        console.log('Your server is on!')
    })
    
    app.get('/', function(req,res){
        res.sendFile(__dirname+'/index.html')
    })
    app.get('/photos',function(req,res){

      db.collection('Photos').find().toArray()
        .then(result=>{
           
            res.render('photos.ejs', {Photos:result})
            console.log(result)
        })
        .catch(error=>{
            console.error(error)
            
        })
     })
   
    
    app.post('/photos',function(req,res){
      
        title.insertOne(req.body)
        .then(result=>{ 
            res.redirect('/photos')
        })

        .catch(error=>{
            console.error(error)
        })
    })
 })





