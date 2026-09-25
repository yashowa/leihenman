
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article') 
const auth = require('../middleware/auth')

router.get('/',auth,ArticleController.getAllArticles)

router.post('/',auth,ArticleController.createArticle)

router.get('/:id',auth,ArticleController.getOneArticle)

router.put('/:id',auth,ArticleController.updateArticle)

router.delete('/:id',auth,ArticleController.deleteArticle)

module.exports = router;
