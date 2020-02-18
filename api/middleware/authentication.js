const jwt = require('jsonwebtoken');

// Verify if there is a token
module.exports = (req, res, next) =>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  }catch(err){
    return res.status(401).json({
      message:'Auth failed'
    })
  }
};