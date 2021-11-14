const express = require("express");
const router = express.Router();
const forgetController = require('../controller/forget');

router.post("/forgetpassword", async (req, res) => {
    const datas = req.body;
    forgetController.forgetPassword(datas, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get("/reset", (req, res) => {
    const datas = req.body;
    forgetController.reset(datas, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.post("/updatePassword", async (req, res) => {
    let datas = req.body;
    forgetController.updatePassword(datas, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
