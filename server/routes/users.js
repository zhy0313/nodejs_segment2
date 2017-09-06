var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

// 查询用户列表
router.get('/', function (req, res) {
    Users.getUserList(req,res);
    // Users.register(req,res);
});

// 注册
router.get('/register',(req,res)=>{
    Users.register(req,res);
});


module.exports = router;
