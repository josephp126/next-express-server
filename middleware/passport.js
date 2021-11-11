const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const con = require("../db/conn");

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "joanlouji",
        },
        function(jwtPayload, done) {
            let sql = `select * from users where id = ${jwtPayload.sub}`;
            con.query(sql, function(err, result) {
                if(err) return done(err);
                if(result[0]){
                    let user = JSON.parse(JSON.stringify(result[0]));
                    return done(null, user);
                }
            });
        }
    )
);