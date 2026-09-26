
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article') 
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/',auth,ArticleController.getAllArticles)

router.post('/',auth,multer,ArticleController.createArticle)

router.get('/:id',auth,ArticleController.getOneArticle)

router.put('/:id',auth,multer,ArticleController.updateArticle)

router.delete('/:id',auth,multer,ArticleController.deleteArticle)

module.exports = router;
