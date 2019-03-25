const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', function(req, res, next) {
  res.status(200).json({success: true});
});

module.exports = indexRouter;
