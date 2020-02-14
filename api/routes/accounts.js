var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res);
  res.status(201).json({
    message: "New account has been created. Please verify your account"
  })
});

module.exports = router;
