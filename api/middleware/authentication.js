const jwt = require('jsonwebtoken');

// Verify if there is a token
module.exports = (req, res, next) =>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  }catch(err){
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message:'Unauthorized'
      })
    }
    return res.status(400).json({
      message:'Auth failed'
    })
  }
};