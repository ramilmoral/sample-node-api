const mongoose = require('mongoose');
const argon = require('argon2');
const Account = require('../models/Accounts');
const jwtGenerator = require('../helpers/jwt-generator');
// const mail = require('../middleware/mailer');
// const emailTemplate = require('../emails/email');
// const Token = require('../models/Token');
// const tokenCtrl = require('../controllers/TokenController')

/**
 * Create a CRUD operations inside the Account Controller
 * Develop by: Ramil Moral
 */

// Create / Register an account
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
        updatedAt: "",
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

// Make a login
const accountLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  Account.find({
    email: email
  })
  .exec()
  .then(account => {
    if (account.length < 1) {
      res.status(401).json({
        message: 'Auth failed',
      });
    }
    argon.verify(account[0].password, password)
    .then(result => {
      if (result) {
        const payload = {
          email: account[0].email,
          accountId: account[0]._id
        }
        return res.status(200).json({
          message: 'Auth successful',
          email:account[0].email,
          accessToken: jwtGenerator.sign(payload, process.env.JWT_KEY, "1h"),
        })
      }
      res.status(401).json({
        message: "Auth failed"
      });
    }).catch(err => {
      res.status(500).json({
        message: "not working",
        error: err
      });
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
}

// Read / Fetch all account data
const getAll = (req, res, next)=>{
  Account.find()
  .select('email firstname lastname') // to display all just remove select()
  .sort({_id: -1}) // sort to DESC order
  .exec()
  .then(account => {
    res.status(200).json({
      message: 'All accounts',
      accounts: account
    });
  })
  .catch();
};

// Read / Find and Get Account by ID
const getByAccountId = (req, res, next)=>{
  const id = req.params.accountId;
  Account.findById(mongoose.Types.ObjectId(id))
  .exec()
  .then(account => {
    res.status(200).json({
      message: 'Account',
      account: account
    });
  })
  .catch();
};

// Update account by ID
const updateAccounts = (req, res, next) => {
  const id = req.params.accountId;
  const updateOps={};

  // Loop all the request body inputted by the user
  for(const k in req.body){
    if(req.body.hasOwnProperty(k)){
      updateOps[k] = req.body[k];
    }
  }
  updateOps.updatedAt = Date.now();
  Account.updateOne({_id:id},{$set:updateOps})
  .exec()
  .then(account=>{
    res.status(200).json({
      message:"Account info has been updated",
      account:account
    });
  })
  .catch(err=>{
    res.status(500).json({
      message:'error',
      error:err
    })
  });
};

// delete account by ID
const deleteAccount = (req, res, next) => {
  const id = req.params.accountId;
  Account.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Account successfully deleted",
      account: result
    })
  })
  .catch(err=>{
    res.status(500).json({
      message:'error',
      error:err
    })
  });
}

// export all classes
module.exports = {
  accountLogin,
  register,
  getAll,
  getByAccountId,
  updateAccounts,
  deleteAccount
};