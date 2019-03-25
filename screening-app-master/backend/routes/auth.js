const express = require('express');

const UserService = require('../services/user');
const userService = new UserService();
const tokenLib = require('../libs/token');

const userRouter = express.Router();

userRouter.get('/', function (req, res, next) {
const queryObj = req.query.admin == null ? {} : {"is_admin": req.query.admin};
  userService.getAll(queryObj).subscribe(
    (users) => res.status(200).json(users),
    (err) => next(err),
    null
  );

});

userRouter.post('/', (req, res, next) => {
  userService.getOne(req.body).subscribe(
    (user) => {
      // console.log(user);
      let admin = false, token = null;
      if(user != null) {
        admin = user.is_admin;
        token = tokenLib.createToken(user);
      }
      res.status(200).json({
        admin: admin,
        token: token,
        user: user
      });
    },
    (err) => next(err),
    null
  );

});

module.exports = userRouter;