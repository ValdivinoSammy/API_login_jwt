const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const userController = require('../controllers/userController');


router.get("/verificar", auth, userController.verificar);
router.get("/getAllMessages", auth, userController.getAllMessages);
router.get("/getChatName", auth, userController.getChatName);

router.post("/message", auth, userController.upMessage);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;