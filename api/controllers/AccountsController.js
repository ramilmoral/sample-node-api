const mongoose = require('mongoose');
const argon = require('argon2');
const Account = require('../models/Accounts');
// const mail = require('../middleware/mailer');
// const emailTemplate = require('../emails/email');
// const jwtGenerator = require('../helper/jwt-generator');
// const Token = require('../models/Token');
// const tokenCtrl = require('../controllers/TokenController')

const register = (req, res, next)=>{
  Account.find({
    email: req.body.email
  })
  .exec()
  .then(account => {
    if (account.length >= 1) {
      return res.status(409).json({
        message: "email already exist"
      });
    }
    argon.hash(req.body.password).then(hash => {
      const id = new mongoose.Types.ObjectId;
      const account = new Account({
        _id: id,
        email: req.body.email,
        password: hash,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        createdAt: Date.now(),
        role: req.body.roleId,
      }); 
    account
    .save().then(result => {
      res.status(201).json({
        message: "New account has been created. Please verify your account"
      })
    }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    });
  });
};

const getAll = (req, res, next)=>{
  Account.find()
  .exec()
  .then(account => {
    res.status(200).json({
      message: 'All accounts',
      accounts: account
    });

  })
  .catch();
};

const getByAccountId = (req, res, next)=>{
  const id = req.params.accountId;
  Account.findById(mongoose.Types.ObjectId(id))
  .exec()
  .then(account => {
    res.status(200).json({
      message: 'User account',
      account: account
    });
  })
};
  
module.exports = {
  register:register,
  getAll: getAll,
  getByAccountId, getByAccountId
};