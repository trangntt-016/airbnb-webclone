const express = require("express"),
    router = express.Router(),
    adminController = require('../controllers/Admin');

router.get('/dashboard',adminController.getDashBoard);
router.get('/add',adminController.getAddRoom);
router.post('/add',adminController.postAddRoom);
router.get('/edit/:id', adminController.getEditRoom);
router.put('/edit/:id',adminController.putEditRoom);
router.get("/logout",adminController.logout);

module.exports = router;
