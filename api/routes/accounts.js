var express = require('express');
var router = express.Router();
const accountCtrl = require('../controllers/AccountsController');

/* GET users listing. 
router.get('/', function(req, res, next) {
  console.log(res);
  res.status(201).json({
    message: "New account has been created. Please verify your account"
  })
});
*/

router.post('/register', accountCtrl.register);
router.get('/', accountCtrl.getAll);
router.get('/:accountId', accountCtrl.getByAccountId);

module.exports = router;
