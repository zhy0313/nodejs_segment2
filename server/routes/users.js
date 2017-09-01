var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

// 查询用户
router.get('/', function (req, res, next) {
    Users.getUserList(req,res);
});

module.exports = router;
