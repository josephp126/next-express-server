const con = require('../db/conn');

const feedback = async (datas, callback) => {
    let sql = "insert into feedback(name, email, phone, subject, message)\
              Value(?,?,?,?,?)";
    let args = [datas.firstName, datas.email, datas.phoneNumber, datas.subject, datas.message];
    con.query(sql, args, function(err, result){
      if(err){
        console.log("feeback save error"+ err);
        callback(err, null);
      } 
      else{
        callback(null, "success");
      }
    })
}

exports.feedback = feedback;

