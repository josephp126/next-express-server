const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const con = require("../db/conn");

const auth = {
  type: "oauth2",
  user: "developermods50@gmail.com",
  clientId:
    "204950957779-0ngcr3h2ih2mg3gjmursajqsinqruog6.apps.googleusercontent.com",
  clientSecret: "GZO5nwXG1P4paTVOIamq4E5E",
  refreshToken:
    "1//0gMWhxXs-_ixUCgYIARAAGBASNwF-L9Ir0Pc20BVkzSS8TdOujubcANtz6VZSnT45ao844xqOjMqMdSTaticYhJyc8QgbbOWtRsI",
};

const transport = nodemailer.createTransport({
  name: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: auth,
});

const forgetPassword = (datas, callback) => {
  const token = crypto.randomBytes(20).toString("hex");
  let sql = "select * from users where email = ?";
  let args = [datas.email];
  con.query(sql, args, function(err, result) {
    if(err) {
      callback(err, null);
    } else {
      if(result.length > 0) {
        let sql = "update users set resetPasswordToken=?, resetPasswordExpires=? where email=?";
        let args = [token, Date.now() + 360000, datas.email];
        con.query(sql, args, function(err, result) {
          if(err) {
            callback("error", null);
          } else {
            const messageNew = {
              // Sender address
              to: datas.email, // List of recipients
              subject: "Link to Reset Password", // Subject line
              text:
                "You are viewing this mail because you(or someone else) has requested to reset the password of your account.\n\n " +
                "Click on the following link to continue or paste it into your browser to contnue .\n " +
                `https://infallible-curran-081295.netlify.app/recovery/${token} \n\n` +
                "If you didn't request this, please ignore this email and your passsword will remain unchanged.",
            };
            transport.sendMail(messageNew, function (err, info) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, info);
              }
            });
          }
        })
      } else {
        callback("no found user", null);
      }
    }
  });
}

const reset = (datas, callback) => {
  let sql = "select * from users where resetPasswordToken = ?";
  let args = [datas.resetPasswordToken];
  con.query(sql, args, function(err, result) {
    if(err) {
      callback(err, null);
    } else {
      if(result.length > 0) {
        let user = JSON.parse(JSON.stringify(result[0]));
        callback(null, user);
      } else {
        callback("password link expires", null);
      }
    }
  });
}

const updatePassword = async (datas, callback) => {
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(datas.password, salt);
  let sql = "select * from users where resetPasswordToken=? and resetpasswordExpires > ?";
  let args = [datas.resetPasswordToken, Date.now()];
  con.query(sql, args, function(err, result) {
    if(err) {
      callback(err, null);
    } else {
      if(result.length > 0) {
        let sql = "update users set password=?, resetPasswordToken=?, resetPasswordExpires=? where resetPasswordToken=? and resetpasswordExpires > ?";
        let args = [datas.password, "", 0, datas.resetPasswordToken, Date.now()];
        con.query(sql, args, function(err, result) {
          if(err) {
            callback(err, null);
          } else {
            callback(null, "success");
          }
        })
      } else {
        callback("no user found", null);
      }
    }
  })
}

exports.forgetPassword = forgetPassword;
exports.reset = reset;
exports.updatePassword = updatePassword;