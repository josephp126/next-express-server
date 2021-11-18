const express = require("express");
const router = express.Router();
const supportController = require('../controller/support');

router.post("/feedback", async (req, res) => {
    const datas = req.body.data;
    supportController.feedback(datas, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
