var express = require('express');
var router = express.Router();
var UsersModel = require('../models/UsersModel');

// 查询用户列表
router.get('/', function (req, res) {
    UsersModel.getUserList(req,res);
    // Users.register(req,res);
});

// 注册
router.post('/register',(req,res)=>{
    UsersModel.register(req,res);
});

// 登录
router.post('/login',(req,res)=>{
    UsersModel.login(req,res);
});

module.exports = router;
