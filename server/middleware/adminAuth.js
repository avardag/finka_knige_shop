let adminAuth = (req, res, next)=>{
  if(req.user.role === 0){
    res.json({success:false, msg: 'Not allowed to post'})
  }
  next()
}


module.exports = adminAuth;