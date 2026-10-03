const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const adminController = require('../controllers/adminController');


router.get("/", auth, adminController.adminConfirmed);

router.post("/criandoNome", auth, adminController.criandoNome);

router.put("/tradeName", auth, adminController.tradeName);

router.delete("/msgDel", auth, adminController.msgDel);

module.exports = router;