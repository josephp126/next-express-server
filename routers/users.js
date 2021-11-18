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

module.exports = router;