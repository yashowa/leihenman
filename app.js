const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const list = require('./articles.json');
const Article = require('./models/Article');

const MONGOURI ='mongodb+srv://yashowa_db_user:pw1I6M5MjMwJaY6W@cluster0.zdozfk0.mongodb.net/?appName=Cluster0' 

mongoose.connect(MONGOURI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });




  app.get('/api/articles',(req, res, next) => {

    Article.find()
    .then((articles)=>{res.status(200).json(articles)})
    .catch(( error)=>{res.status(400).json(error)});
    
  })


  app.post('/api/articles',(req, res, next) => {
    console.log(req.body);
    const article = new Article({...req.body})
    article.save().then(()=>{
        res.status(201).json({message:'article ajouté'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error})
    })
  
  })


  app.post('/api/login',(req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message:'Compte connecté'
    })

  })

  app.post('/api/signin',(req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message:'Compte crée'
    })

  })

module.exports =app; 