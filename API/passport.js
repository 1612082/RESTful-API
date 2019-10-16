const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.secretOrKey = 'wowwow';
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

var User = require('./db').User;
//----------------------------------------------------------------------------------------
var idt ;
const getUser = async obj => {
    return await User.findOne({
      where: obj,
    });
  }; 
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    idt=jwt_payload.id;
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

  


module.exports = {
    run: () => {
        passport.use(strategy)
    },
    secuse: () =>{
        return(idt);
    },
}
 
