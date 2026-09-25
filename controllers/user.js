
const User = require('../models/User');
const bcrypt=require('bcrypt')

exports.getAllUser = (req, res, next) => {
    User.find()
    .then((users)=>{res.status(200).json(users)})
    .catch(( error)=>{res.status(400).json(error)});
}

exports.createUser = (req, res, next) => {
    console.log(req.body);
    const user = new User({...req.body})
    user.save().then(()=>{
        res.status(201).json({message:'utilisateur ajouté'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error});
    })
}

exports.getOneUser = (req, res, next) => {
    console.log(req.params.id);
    User.findOne({_id:req.params.id})
    .then(user=>res.status(200).json(user))
    .catch(error=>res.status(400).json(error))
}


exports.updateUser = (req, res, next) => {

    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }).then(()=>{
        res.status(201).json({message:'utilisateur mis à jour'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error});
    })
}


exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).
    then(()=>{ res.status(201).json({message:'utilisateur ' + req.params.id + ' supprimé'})
    }).catch((error)=>{
        console.error('ERROR',error)
        res.status(400).json({error});
    })
}

