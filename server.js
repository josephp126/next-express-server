const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const con = require('./db/conn');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const port = process.env.PORT || 5000;

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(express.static(__dirname + "/build"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.post('/register', async (req, res) => {
  let datas = req.body.data;
  const salt = await bcrypt.genSalt(10);
  datas.password = await bcrypt.hash(datas.password, salt);
  let sql = "insert into users(name, email, password, phone)\
            Value(?,?,?,?)";
  let args = [datas.name, datas.email, datas.password, datas.telNum];
  con.query(sql, args, function(err, result){
    if(err){
      console.log("register error"+ err);
    } 
    else{
      res.send("success");
    }
  })
});

app.post('/login', async (req, res) => {
  let datas = req.body.data;
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
})