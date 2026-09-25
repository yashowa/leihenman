
const Article = require('../models/Article');

exports.getAllArticles = (req, res, next) => {
    Article.find()
    .then((articles)=>{res.status(200).json(articles)})
    .catch(( error)=>{res.status(400).json(error)});
}

exports.createArticle = (req, res, next) => {
    console.log(req.body);
    const article = new Article({...req.body})
    article.save().then(()=>{
        res.status(201).json({message:'article ajouté'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error});
    })
}

exports.getOneArticle = (req, res, next) => {
    console.log(req.params.id);
    Article.findOne({_id:req.params.id})
    .then(article=>res.status(200).json(article))
    .catch(error=>res.status(400).json(error))
}


exports.updateArticle = (req, res, next) => {
    console.log(req.body);
    const article = new Article({...req.body})
    article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }).then(()=>{
        res.status(201).json({message:'article mis à jour'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error});
    })
}


exports.deleteArticle = (req, res, next) => {
    Article.deleteOne({ _id: req.params.id }).
    then(()=>{ res.status(201).json({message:'article ' + req.params.id + ' supprimé'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error});
    })
  }