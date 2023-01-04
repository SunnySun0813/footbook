const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require("../middleware/check-auth");
// problem?
router.get('/:email/:password', userController.getUser);
router.put('/:id/:email', userController.editUserInfo);
router.put('/:id', userController.editUser);
router.get('/:email',userController.getOther);
router.post('', userController.addUser);
router.get('', userController.getAllOther);

module.exports = router;
