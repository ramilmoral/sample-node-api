var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/authentication');
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
router.post('/login', accountCtrl.accountLogin);
router.get('/', accountCtrl.getAll);
router.get('/:accountId', checkAuth, accountCtrl.getByAccountId);
router.put('/:accountId', checkAuth, accountCtrl.updateAccounts);
router.delete('/:accountId', checkAuth, accountCtrl.deleteAccount);

module.exports = router;
