const express = require("express");
const router = express.Router();
const pricingController = require("../controller/pricing");

router.post('/getprice', async (req, res) => {
    let datas = req.body.data;
    pricingController.getPrice(datas, function(err, result){
        if(err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;