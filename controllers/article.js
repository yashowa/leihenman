
const Article = require('../models/Article');
const fs = require('fs')
exports.getAllArticles = (req, res, next) => {
    console.log(req.body,'pattern article')
    Article.find()
    .then((articles)=>{res.status(200).json(articles)})
    .catch(( error)=>{res.status(400).json({error})});
}

exports.createArticle = (req, res, next) => {

    console.log(req.body ,'body create article')
    const articleObject = JSON.parse(req.body.article)
    
    delete articleObject._id;
    delete articleObject._userId;

    const article = new Article({
        ...articleObject,
        userId : req.auth.userId,
        imageUrl : `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
    })

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
    const articleObject=req.file?{
        ...JSON.parse(req.body.article),
        imageUrl :`${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
    }:{...req.body}
    delete thingObject._userId;

    Article.findOne({_id:req.params.id})
    .then(article=>{
            if(article.userId!=req.auth.userId){
                res.status(401).json({message:'not authorized'})
            }else{
                article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then(()=>{
                    res.status(201).json({message:'article mis à jour'})
                }).catch((error)=>{
                    console.error('ERROR',error)
                    res.status(400).json({error});
                })
            }
        }
    )
    .catch((error)=>{
        res.status(400).json({error})
    })

}


exports.deleteArticle = (req, res, next) => {

    Article.findOne({ _id: req.params.id })
    .then((article=>{
        if(article.userId !== req.auth.userId){
            res.status(401).json({message:'Non autorisé!'})
        }else{
            //suppression du fichier sur le serveur et de l'article en base
            const filename = article.imageUrl.split('/uploads/images/')[1];
            fs.unlink(`uploads/images/${filename}`,()=>{
                Article.deleteOne({ _id: req.params.id }).
                then(()=>{ res.status(201).json({message:'article ' + req.params.id + ' supprimé'})
                }).catch((error)=>{
                    console.error('ERROR',error)
                    res.status(400).json({error});
                })
            })


        }
    }))
    .catch(
        error=>res.status(500).json({error})
    )


  }