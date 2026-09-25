const express = require('express');
const UserController = require('../controllers/user')
const router =express.Router();
const auth = require('../middleware/auth')

router.get('/',auth ,UserController.getAllUser);
router.get('/:id',auth,UserController.getOneUser);
router.put('/:id',auth,UserController.updateUser);
router.delete('/:id',UserController.deleteUser);

module.exports = router;