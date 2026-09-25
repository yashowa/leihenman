
const User = require('../models/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken')

  exports.signup= (req, res, next) => {

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            password:hash,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            active:req.body.active,
            role:req.body.role,
        })
        console.log(user,'user')
        user.save()
        .then(()=>{
            res.status(200).json({message:'utilisateur crée'})
        })
        .catch((error)=>{res.status(400).json({error})})
    })
    .catch((error)=>{res.status(500).json({error})})
  }

  exports.login = (req, res, next) => {

    User.findOne({email:req.body.email})
    .then(user=>{
        if((!user)){
            res.status(401).json({message:'Identifiants incorrects'})
        }else{
            bcrypt.compare(req.body.password,user.password)
            .then(userValid=>{

                if(!userValid){
                    res.status(401).json({message:'Identifiants incorrects'})
                }else{
                    res.status(200).json({
                        user:{
                            userId:user._id,
                            token:'Token'
                        }
                    })   
                }

            })
            .catch(()=>{res.status(401).json({message:'Identifiants incorrects'})})
        }
    })
    .catch((error=>{res.status(500).json({error})}))
  }

