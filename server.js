const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const routers = require("./routers/routers");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(express.static(__dirname + "/build"));

// all Routers
app.use('/', routers);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});



