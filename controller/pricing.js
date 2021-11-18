const con = require('../db/conn');

const getPrice = (datas, callback) => {
    let backData = {
        error: 0,
        shippingServices: {
            ups_worldwide_expedited: {
                apiResponse: { },
                charge: datas.height * datas.width / 2 + 6 * datas.length,
                days: Math.floor(datas.weight * datas.length),
                ec_charge: datas.height * datas.width / 2 + 6 * datas.length,
                label: "UPS Standard 3 - 8 days",
                maxDays: 8,
                minDays: 3,
                serviceLabel: "UPS Standard",
                ship_by: "UPS Expedited"
            }
        }
    }
    callback(null, backData);
}

exports.getPrice = getPrice;