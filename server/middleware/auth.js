const User = require("./../models/user");

let auth = (req, res, next) =>{
  //get token from clients browser
  let token = req.cookies.f_auth;

  //use our custom user model MW method to check for user
  User.findByToken(token, (err, user)=>{

    if(err) throw err;
    if(!user) return res.json({
      isAuth: false,
      error: true
    })
    //all good, then:
    //bind token and user data to request object, to be used in next()
    req.token = token;
    req.user = user;
    next();
  })
}


module.exports = auth