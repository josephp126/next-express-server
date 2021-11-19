const express = require("express");
const router = express.Router();
const userController = require("../controller/users");

router.post('/register', async (req, res) => {
    let datas = req.body.data;
    userController.register(datas, function(err, result){
        if(err) {
            res.send(err);
        } else {
            res.send("success");
        }
    });
});
  
router.post('/login', async (req, res) => {
    let datas = req.body.data;
    userController.login(datas, function(err, result){
        if(err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/uploadfile', (req, res) => {
    userController.uploadFile(req, function(err, result) {
        if(err) {
            res.send("error");
        } else {
            res.send("success");
        }
    })
});

router.get('/getinvoices', (req, res) => {
    let datas = req.body;
    userController.getInvoices(datas, function(err, result) {
        if(err) {
            res.send("error");
        } else {
            res.json(result);
        }
    })
})

module.exports = router;