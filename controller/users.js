const con = require('../db/conn');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const genToken = (user) => {
    return jwt.sign(
      {
        iss: "Joan_Louji",
        sub: user.id,
        // iat: new Date().getTime(),
      },
      "joanlouji",
      // "Stack",
      {
        expiresIn: 10000000000000,
      }
    );
};

const register = async (datas, callback) => {
    const salt = await bcrypt.genSalt(10);
    datas.password = await bcrypt.hash(datas.password, salt);
    let sql = "insert into users(name, email, password, phone)\
              Value(?,?,?,?)";
    let args = [datas.name, datas.email, datas.password, datas.telNum];
    con.query(sql, args, function(err, result){
      if(err){
        console.log("register error"+ err);
        callback(err, null);
      } 
      else{
        callback(null, "success");
      }
    })
}

const login = (datas, callback) => {
    let sql = 'select * from users where email = ?';
    var args = [datas.email];
    con.query(sql, args, function(err, result){
      if(err){
        res.json({err: err})
      } else {
        console.log(result)
        if(result.length > 0){
          let user = JSON.parse(JSON.stringify(result[0]));
          console.log(user.password)
          bcrypt.compare(datas.password, user.password, (err, comRes) => {
            if(comRes){
              const newUser = {
                id: user.id,
                email: user.email,
              }
              user.token = "Bearer " + genToken(newUser);
              res.json(user);
            } else {
              res.json({err: "invalid user"});
            }
          })
        } else{
          res.json({err: "invalid user"});
        }
      }
    })
}

exports.register = register;
exports.login = login;

